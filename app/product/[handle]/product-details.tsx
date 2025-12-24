"use client";

import { useCart } from "@/lib/cart-context";
import { getProducts, Product, Review } from "@/lib/mock-data";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export function ProductDetails({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState("M");
  const [activeImage, setActiveImage] = useState(product.image);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  // Use product images if available, otherwise just the main image
  const gallery = product.images || [product.image];

  useEffect(() => {
    // 1. Fetch Related and Recently Viewed from API
    getProducts().then(allProducts => {
        // Related
        const related = allProducts
            .filter(p => p.category === product.category && p.id !== product.id)
            .slice(0, 4);
        setRelatedProducts(related);

        // Recently Viewed logic
        const raw = localStorage.getItem("recently-viewed");
        let viewedHandles = raw ? JSON.parse(raw) : [];
        
        viewedHandles = viewedHandles.filter((h: string) => h !== product.handle);
        viewedHandles.unshift(product.handle);
        
        const limited = viewedHandles.slice(0, 10);
        localStorage.setItem("recently-viewed", JSON.stringify(limited));

        const displayList = limited
          .filter((h: string) => h !== product.handle)
          .map((h: string) => allProducts.find(p => p.handle === h))
          .filter(Boolean)
          .slice(0, 4) as Product[];
        
        setRecentlyViewed(displayList);
    });

    // Reset active image when product changes
    setActiveImage(product.image);
  }, [product.handle, product.image, product.category, product.id]);

  const averageRating = product.reviews 
    ? (product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length).toFixed(1)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
      <Breadcrumbs />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-24">
        
        {/* Gallery Section */}
        <div className="flex flex-col md:flex-row gap-6">
            {/* Thumbnails */}
            <div className="order-2 md:order-1 flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto no-scrollbar md:w-24">
                {gallery.map((img, idx) => (
                    <button 
                        key={idx}
                        onClick={() => setActiveImage(img)}
                        className={`relative aspect-[3/4] w-20 md:w-full flex-shrink-0 bg-gray-100 rounded-sm overflow-hidden border-2 transition-all ${
                            activeImage === img ? 'border-black' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                    >
                        <Image src={img} alt={`${product.title} ${idx + 1}`} fill className="object-cover" />
                    </button>
                ))}
            </div>

            {/* Main Image */}
            <div className="order-1 md:order-2 relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden group flex-1">
                <Image
                    src={activeImage}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-2">
                <h1 className="text-4xl font-bold text-secondary tracking-tight">{product.title}</h1>
            </div>
            <div className="flex items-center gap-3">
                <p className="text-gray-500 font-medium">{product.category}</p>
                <div className="w-1 h-1 bg-gray-300 rounded-full" />
                <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((s) => (
                        <svg 
                            key={s} 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="14" height="14" 
                            viewBox="0 0 24 24" 
                            fill={s <= Math.round(Number(averageRating)) ? "black" : "none"} 
                            stroke="black" 
                            strokeWidth="2" 
                            className="mr-0.5"
                        >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                    ))}
                    <span className="text-xs font-bold text-secondary ml-2 underline underline-offset-4 cursor-pointer">
                        {product.reviews?.length || 0} Reviews
                    </span>
                </div>
            </div>
          </div>

          <p className="text-3xl text-secondary mb-10 font-black">
            {product.currency === "USD" ? "$" : product.currency}{product.price.toFixed(2)}
          </p>

          {/* Size Selection */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-bold uppercase tracking-widest text-secondary">Select Size</span>
              <button className="text-xs underline text-gray-400 hover:text-accent transition-colors">Size Guide</button>
            </div>
            <div className="flex gap-3">
              {["S", "M", "L", "XL"].map(size => (
                <button 
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-14 h-14 rounded-full border flex items-center justify-center font-bold transition-all ${
                    selectedSize === size 
                    ? 'border-black bg-black text-white' 
                    : 'border-gray-200 text-gray-400 hover:border-black hover:text-black shadow-sm'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="prose prose-zinc text-gray-500 mb-12 max-w-none">
            <p className="leading-relaxed">
              {product.description || `The ${product.title} represents the peak of our minimalist design philosophy. Precision cut from sustainably sourced fabrics, it offers a silken feel and unmatched durability.`}
            </p>
          </div>

          <button
            onClick={() => {
              const imageElement = document.querySelector('.group img');
              const rect = imageElement?.getBoundingClientRect();
              addItem(product, selectedSize, rect);
            }}
            className="w-full bg-black text-white text-lg font-bold py-5 rounded-full hover:bg-zinc-800 transition-all shadow-xl hover:shadow-2xl transform active:scale-[0.98] mb-8"
          >
            Add to Bag
          </button>

          {/* Benefits Grid */}
          <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-8">
            {["Ethically Made", "Free Shipping", "Premium Fabric", "Lifetime Repair"].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3 text-xs font-bold uppercase tracking-tight text-gray-600">
                    <span className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-accent">✓</span>
                    {benefit}
                </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="border-t border-gray-100 pt-24 mb-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <div>
                <h2 className="text-3xl font-bold text-secondary tracking-tight mb-2">Customer Reviews</h2>
                <div className="flex items-center gap-4">
                    <span className="text-5xl font-black text-secondary">{averageRating}</span>
                    <div>
                        <div className="flex mb-1">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill={s <= Math.round(Number(averageRating)) ? "black" : "none"} stroke="black" strokeWidth="2" className="mr-1">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                                </svg>
                            ))}
                        </div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Based on {product.reviews?.length || 0} reviews</p>
                    </div>
                </div>
            </div>
            <button className="bg-white border-2 border-black text-black px-8 py-4 font-bold text-xs uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all rounded-sm">
                Write a Review
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {product.reviews?.map((review) => (
                <div key={review.id} className="bg-gray-50 p-8 rounded-sm animate-in fade-in duration-500">
                    <div className="flex mb-4">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill={s <= review.rating ? "black" : "none"} stroke="black" strokeWidth="2" className="mr-0.5">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                            </svg>
                        ))}
                    </div>
                    <p className="text-secondary font-bold mb-4 line-clamp-3">"{review.comment}"</p>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-black text-secondary">{review.author}</p>
                            {review.verified && (
                                <p className="text-[10px] text-green-600 font-bold uppercase tracking-widest mt-1 italic">Verified Purchase ✓</p>
                            )}
                        </div>
                        <span className="text-[10px] text-gray-400 font-bold">{new Date(review.date).toLocaleDateString()}</span>
                    </div>
                </div>
            ))}
            {(!product.reviews || product.reviews.length === 0) && (
                 <div className="col-span-full py-20 text-center bg-gray-50 border-2 border-dashed border-gray-100 text-gray-400 rounded-sm">
                    <p className="font-bold uppercase tracking-widest text-xs">No reviews yet. Be the first to share your experience.</p>
                 </div>
            )}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-gray-100 pt-24">
          <div className="flex justify-between items-end mb-12">
            <div>
               <h2 className="text-3xl font-bold text-secondary tracking-tight mb-2">You May Also Like</h2>
               <p className="text-gray-400 text-sm">Perfectly paired with your selection.</p>
            </div>
            <Link href="/shop" className="text-sm font-bold border-b-2 border-accent pb-1 transition-all hover:border-black">Shop All</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <section className="border-t border-gray-100 pt-24 mt-24">
          <div className="mb-12">
             <h2 className="text-2xl font-bold text-secondary tracking-tight mb-2">Recently Viewed</h2>
             <p className="text-gray-400 text-sm italic">Items you looked at earlier.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-8">
            {recentlyViewed.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Sticky Mobile Add to Bag Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-[80] md:hidden animate-in slide-in-from-bottom-full duration-500">
        <div className="flex gap-4 items-center">
            <div className="flex-1">
                <p className="font-bold text-secondary text-sm truncate">{product.title}</p>
                <p className="font-black text-secondary">${product.price.toFixed(2)}</p>
            </div>
            <button
                onClick={() => {
                    const rect = document.querySelector('.group img')?.getBoundingClientRect();
                    addItem(product, selectedSize, rect);
                }}
                className="bg-black text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest active:scale-95 transition-all"
            >
                Add — {selectedSize}
            </button>
        </div>
      </div>
    </div>
  );
}
