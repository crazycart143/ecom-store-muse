"use client";

import { useCart } from "@/lib/cart-context";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export function CartDropdown() {
  const { items, isOpen, setIsOpen, removeItem, subtotal } = useCart();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  return (
    <div 
      ref={dropdownRef}
      className="absolute top-16 right-4 w-96 bg-white shadow-2xl rounded-lg overflow-hidden border border-gray-100 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
    >
      <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-semibold text-secondary">Shopping Cart</h3>
        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-black">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>

      {/* Free Shipping Progress */}
      {items.length > 0 && (
        <div className="px-4 py-3 bg-white border-b border-gray-100">
            <p className="text-[10px] font-bold uppercase tracking-widest mb-2 text-center">
                {subtotal >= 200 ? (
                    <span className="text-green-600">Congrats! You've unlocked FREE SHIPPING ✓</span>
                ) : (
                    <span>Add <span className="text-accent underline underline-offset-2">${(200 - subtotal).toFixed(2)}</span> more for Free Shipping</span>
                )}
            </p>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-accent transition-all duration-1000 ease-out"
                    style={{ width: `${Math.min((subtotal / 200) * 100, 100)}%` }}
                />
            </div>
        </div>
      )}

      <div className="max-h-96 overflow-y-auto p-4 space-y-4">
        {items.length === 0 ? (
          <div className="text-center py-12 px-4">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            </div>
            <p className="text-secondary font-bold mb-2">Your bag is empty</p>
            <p className="text-gray-400 text-xs mb-6">Looks like you haven't added anything yet.</p>
            <Link 
              href="/shop" 
              onClick={() => setIsOpen(false)}
              className="inline-block bg-black text-white text-xs font-bold uppercase tracking-widest px-8 py-3 rounded-full hover:bg-zinc-800 transition-colors"
            >
              Start Explorin'
            </Link>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="relative w-16 h-16 bg-gray-100 flex-shrink-0 rounded-md overflow-hidden">
                <Image src={item.product.image} alt={item.product.title} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-secondary line-clamp-1">{item.product.title}</h4>
                <div className="flex gap-2 items-center mt-0.5">
                  <p className="text-[10px] text-gray-400">{item.product.category}</p>
                  {item.size && (
                    <span className="text-[9px] font-bold bg-gray-100 text-secondary px-1 py-0.5 rounded">SIZE: {item.size}</span>
                  )}
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-semibold">${item.product.price} × {item.quantity}</span>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-xs text-red-500 hover:text-red-700 underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <div className="flex justify-between mb-4 text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-bold text-secondary">${subtotal.toFixed(2)}</span>
        </div>
        <Link 
          href="/cart" 
          onClick={() => setIsOpen(false)}
          className="block w-full bg-black text-white text-center py-3 rounded-md font-medium hover:bg-gray-900 transition-colors"
        >
          View Cart & Checkout
        </Link>
      </div>
    </div>
  );
}
