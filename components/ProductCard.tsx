"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/mock-data";
import { useCart } from "@/lib/cart-context";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  onQuickView?: () => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addItem } = useCart();
  const [isLoaded, setIsLoaded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); 
    e.stopPropagation();
    
    // Find the image element within the card to use as start rect
    const card = e.currentTarget.closest('.group');
    const image = card?.querySelector('img');
    const rect = image?.getBoundingClientRect();

    addItem(product, 'M', rect);
  };

  const handleQuickViewInternal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.();
  };

  // Logic for badges (mocked for demo)
  const isNew = parseInt(product.id) % 3 === 0;
  const isSale = product.price < 80;

  return (
    <Link href={`/product/${product.handle}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-6 rounded-sm">
        {/* Shimmer Placeholder */}
        {!isLoaded && <div className="absolute inset-0 skeleton" />}
        
        <Image
          src={product.image}
          alt={product.title}
          fill
          onLoad={() => setIsLoaded(true)}
          className={`object-cover object-center group-hover:scale-105 transition-all duration-700 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
          {isNew && (
            <span className="bg-white text-secondary text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 shadow-sm">
              New Arrival
            </span>
          )}
          {isSale && (
            <span className="bg-accent text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 shadow-sm">
              Sale
            </span>
          )}
        </div>

        {/* Action Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out flex flex-col gap-2">
           <button 
             onClick={handleQuickAdd}
             className="w-full bg-white text-secondary py-3 font-bold text-[9px] uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all shadow-xl active:scale-[0.98]"
             aria-label={`Quick add ${product.title} to cart`}
           >
             Quick Add — M
           </button>
           {onQuickView && (
             <button 
               onClick={handleQuickViewInternal}
               className="w-full bg-black/80 backdrop-blur-md text-white py-3 font-bold text-[9px] uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl active:scale-[0.98]"
               aria-label={`Quick view ${product.title}`}
             >
               Quick View
             </button>
           )}
        </div>
      </div>
      
      <div className="flex justify-between items-start gap-4 px-1">
        <div>
          <h3 className="text-secondary font-bold text-base leading-tight group-hover:text-accent transition-colors tracking-tight">
            {product.title}
          </h3>
          <p className="text-gray-400 text-[11px] font-bold uppercase tracking-widest mt-2">{product.category}</p>
        </div>
        <div className="text-right">
          <p className="text-secondary font-black text-base">
            {product.currency === "USD" ? "$" : product.currency}{product.price.toFixed(2)}
          </p>
          {isSale && (
            <p className="text-gray-400 text-[10px] line-through font-bold mt-1">
              ${(product.price * 1.4).toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
