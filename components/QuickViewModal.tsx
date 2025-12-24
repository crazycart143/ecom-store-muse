"use client";

import { Product } from "@/lib/mock-data";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/cart-context";

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState("M");
  const [activeImage, setActiveImage] = useState(product?.image || "");

  // Reset when product changes
  useEffect(() => {
    setSelectedSize("M");
    if (product) setActiveImage(product.image);
  }, [product]);

  if (!isOpen || !product) return null;

  const averageRating = product.reviews 
    ? (product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length).toFixed(1)
    : 0;

  const gallery = product.images || [product.image];

  return (
    <div 
        className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div 
        className="bg-white max-w-4xl w-full rounded-sm overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300"
        role="dialog"
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image Side */}
            <div className="relative aspect-[4/5] bg-gray-100 group">
                <Image 
                    src={activeImage} 
                    alt={product.title} 
                    fill 
                    className="object-cover transition-all duration-500"
                />
                
                {/* Micro Thumbnails */}
                {gallery.length > 1 && (
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2 justify-center">
                        {gallery.map((img, idx) => (
                            <button 
                                key={idx}
                                onClick={() => setActiveImage(img)}
                                className={`w-2 h-2 rounded-full border border-white transition-all ${
                                    activeImage === img ? 'bg-white scale-125' : 'bg-white/40'
                                }`}
                            />
                        ))}
                    </div>
                )}

                <button 
                  onClick={onClose}
                  className="absolute top-4 right-4 md:hidden p-2 bg-white rounded-full shadow-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
            </div>

            {/* Info Side */}
            <div className="p-8 md:p-12 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                             <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase">{product.category}</h3>
                             <div className="w-1 h-1 bg-gray-200 rounded-full" />
                             <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map(s => (
                                    <svg key={s} width="10" height="10" viewBox="0 0 24 24" fill={s <= Math.round(Number(averageRating)) ? "black" : "none"} stroke="black" strokeWidth="2" className="mr-0.5">
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                                    </svg>
                                ))}
                             </div>
                        </div>
                        <h2 className="text-3xl font-black text-secondary tracking-tight">{product.title}</h2>
                    </div>
                    <button 
                        onClick={onClose}
                        className="hidden md:block p-2 text-gray-400 hover:text-black transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                </div>

                <p className="text-2xl font-black text-secondary mb-6">${product.price.toFixed(2)}</p>

                {/* Size Selection */}
                <div className="mb-10">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Select Size</p>
                    <div className="flex gap-3">
                        {["S", "M", "L", "XL"].map(size => (
                            <button 
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-black text-xs transition-all ${
                                    selectedSize === size 
                                    ? 'border-black bg-black text-white' 
                                    : 'border-gray-100 text-gray-400 hover:border-black hover:text-black'
                                }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-auto space-y-4">
                    <button 
                        onClick={() => {
                            addItem(product, selectedSize);
                            onClose();
                        }}
                        className="w-full bg-black text-white py-5 font-black uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all active:scale-[0.98] shadow-xl"
                    >
                        Add to Bag
                    </button>
                    <Link 
                        href={`/product/${product.handle}`} 
                        className="block w-full text-center text-[10px] font-black uppercase tracking-[0.2em] underline underline-offset-8 hover:text-accent transition-colors"
                    >
                        View Full Details
                    </Link>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
