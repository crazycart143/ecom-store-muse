"use client";

import { useCart } from "@/lib/cart-context";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(false);

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold text-secondary mb-4">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
        <Link href="/shop" className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
      <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-12">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-8 space-y-8">
          {items.map((item) => (
            <div key={item.id} className="flex gap-6 py-6 border-b border-gray-100 last:border-0">
              <div className="relative w-24 h-32 md:w-32 md:h-40 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <Image src={item.product.image} alt={item.product.title} fill className="object-cover" />
              </div>
              
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="text-lg font-medium text-secondary">{item.product.title}</h3>
                      <div className="flex gap-2 items-center mt-1">
                        <p className="text-gray-500 text-sm">{item.product.category}</p>
                        {item.size && (
                          <span className="text-sm font-bold bg-gray-100 px-1.5 py-0.5 rounded text-secondary">Size: {item.size}</span>
                        )}
                      </div>
                    </div>
                    <p className="font-semibold text-lg text-secondary">${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex justify-between items-end">
                  <div className="flex items-center space-x-2">
                     <span className="text-sm text-gray-500 font-medium">Quantity:</span>
                     <div className="flex items-center border border-gray-200 rounded-full">
                       <button 
                         onClick={() => updateQuantity(item.id, item.quantity - 1)}
                         className="px-3 py-1 hover:bg-gray-50 text-secondary"
                       >
                         −
                       </button>
                       <span className="px-2 text-sm font-bold text-secondary min-w-[20px] text-center">{item.quantity}</span>
                       <button 
                         onClick={() => updateQuantity(item.id, item.quantity + 1)}
                         className="px-3 py-1 hover:bg-gray-50 text-secondary"
                       >
                         +
                       </button>
                     </div>
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-xs font-bold uppercase tracking-widest text-red-500 hover:text-red-700 underline underline-offset-4"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <div className="bg-gray-50 p-8 rounded-2xl sticky top-24">
            {/* Free Shipping Progress */}
            <div className="mb-10 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <p className="text-[11px] font-black uppercase tracking-[0.1em] mb-3 text-center">
                    {subtotal >= 200 ? (
                        <span className="text-green-600 italic">You've unlocked Free Shipping!</span>
                    ) : (
                        <span>You're <span className="text-accent underline underline-offset-4">${(200 - subtotal).toFixed(2)}</span> away from Free Shipping</span>
                    )}
                </p>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                        className={`h-full bg-accent transition-all duration-1000 ease-out ${subtotal >= 200 ? 'bg-green-500' : ''}`}
                        style={{ width: `${Math.min((subtotal / 200) * 100, 100)}%` }}
                    />
                </div>
            </div>

            <h2 className="text-xl font-bold text-secondary mb-8">Order Summary</h2>
            
            <div className="space-y-4 text-sm mb-8 font-medium">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span className="text-secondary font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span className="text-green-600 font-bold uppercase text-[10px] tracking-widest">Free</span>
              </div>
              {appliedPromo && (
                <div className="flex justify-between text-green-600">
                  <span>Discount (MUSE20)</span>
                  <span className="font-bold">-${(subtotal * 0.2).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-500">
                <span>Tax</span>
                <span className="text-secondary font-bold">$0.00</span>
              </div>
            </div>

            {/* Promo Code Input */}
            {!appliedPromo ? (
                <div className="mb-8 flex gap-2">
                    <input 
                        type="text" 
                        placeholder="PROMO CODE" 
                        className="flex-1 bg-white border border-gray-200 px-4 py-2 text-xs font-bold uppercase tracking-widest outline-none focus:border-black"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                    />
                    <button 
                        onClick={() => {
                            if (promoInput.toUpperCase() === 'MUSE20') {
                                setAppliedPromo(true);
                            }
                        }}
                        className="bg-secondary text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-black transition-colors"
                    >
                        Apply
                    </button>
                </div>
            ) : (
                <div className="mb-8 p-3 bg-green-50 border border-green-100 rounded text-[10px] font-bold text-green-700 uppercase tracking-widest flex justify-between items-center">
                    <span>Promo Applied: MUSE20 (20% OFF)</span>
                    <button onClick={() => setAppliedPromo(false)} className="text-red-500 underline">Remove</button>
                </div>
            )}

            <div className="border-t border-gray-200 pt-6 flex justify-between mb-8">
              <span className="font-bold text-lg text-secondary uppercase tracking-widest">Total</span>
              <span className="font-black text-2xl text-secondary">
                ${(appliedPromo ? subtotal * 0.8 : subtotal).toFixed(2)}
              </span>
            </div>

            <button className="w-full bg-black text-white py-5 rounded-full font-bold uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all shadow-xl hover:shadow-2xl transform active:scale-[0.98]">
              Checkout Now
            </button>
            <p className="text-[10px] text-gray-400 text-center mt-6 font-bold uppercase tracking-widest leading-relaxed">
              Shipping and taxes calculated during secure checkout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
