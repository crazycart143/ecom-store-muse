"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const { subtotal } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
           <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
        </div>
        <h1 className="text-4xl font-black tracking-tighter text-secondary mb-4">ORDER CONFIRMED</h1>
        <p className="text-gray-500 max-w-md mx-auto mb-8 font-medium">Thank you for your purchase. We've sent a confirmation email with your order details.</p>
        <Link href="/" className="bg-black text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-xl">
           Back To Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
      <h1 className="text-3xl font-bold text-secondary mb-12">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Side: Form */}
        <div className="space-y-12">
            <section>
                <h3 className="text-sm font-black uppercase tracking-widest text-secondary mb-6 border-b pb-2">Shipping Information</h3>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handlePlaceOrder}>
                    <input type="text" placeholder="First Name" required className="border-b-2 border-gray-100 py-3 outline-none focus:border-black transition-colors" />
                    <input type="text" placeholder="Last Name" required className="border-b-2 border-gray-100 py-3 outline-none focus:border-black transition-colors" />
                    <input type="email" placeholder="Email Address" required className="md:col-span-2 border-b-2 border-gray-100 py-3 outline-none focus:border-black transition-colors" />
                    <input type="text" placeholder="Address" required className="md:col-span-2 border-b-2 border-gray-100 py-3 outline-none focus:border-black transition-colors" />
                    <input type="text" placeholder="City" required className="border-b-2 border-gray-100 py-3 outline-none focus:border-black transition-colors" />
                    <input type="text" placeholder="Postal Code" required className="border-b-2 border-gray-100 py-3 outline-none focus:border-black transition-colors" />
                    
                    <div className="md:col-span-2 pt-12">
                        <h3 className="text-sm font-black uppercase tracking-widest text-secondary mb-6 border-b pb-2">Payment Details</h3>
                        <div className="space-y-4">
                            <input type="text" placeholder="Card Number" required className="w-full border-b-2 border-gray-100 py-3 outline-none focus:border-black transition-colors" />
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="MM/YY" required className="border-b-2 border-gray-100 py-3 outline-none focus:border-black transition-colors" />
                                <input type="text" placeholder="CVV" required className="border-b-2 border-gray-100 py-3 outline-none focus:border-black transition-colors" />
                            </div>
                        </div>
                    </div>

                    <button 
                        disabled={isProcessing}
                        className="md:col-span-2 mt-12 bg-black text-white py-5 rounded-full font-bold uppercase tracking-[0.2em] relative overflow-hidden group shadow-2xl disabled:opacity-50"
                    >
                        {isProcessing ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Processing...
                            </div>
                        ) : (
                            <span>Complete Purchase</span>
                        )}
                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </button>
                </form>
            </section>
        </div>

        {/* Right Side: Summary */}
        <div className="bg-gray-50 p-8 rounded-2xl h-fit sticky top-24">
            <h3 className="text-sm font-black uppercase tracking-widest text-secondary mb-6">Order Summary</h3>
            <div className="space-y-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between text-sm font-medium">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="text-secondary font-black">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                    <span className="text-gray-500">Shipping</span>
                    <span className="text-green-600 uppercase text-[10px] tracking-widest font-black">Free</span>
                </div>
                <div className="flex justify-between pt-6 border-t border-gray-200">
                    <span className="font-bold text-lg uppercase tracking-widest">Total</span>
                    <span className="font-black text-2xl">${subtotal.toFixed(2)}</span>
                </div>
            </div>
            
            <div className="mt-12 space-y-4">
                <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <span className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-secondary">✓</span>
                    Secure SSL Encryption
                </div>
                <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <span className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-secondary">✓</span>
                    30-Day Money Back Guarantee
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
