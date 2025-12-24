"use client";

import { useState, useEffect } from "react";

export function NewsletterModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Show modal after 2 seconds
    const timer = setTimeout(() => {
      const shown = localStorage.getItem("newsletter-shown");
      if (!shown) {
        setIsOpen(true);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("newsletter-shown", "true");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
        handleClose();
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="relative bg-white max-w-lg w-full p-12 text-center shadow-2xl animate-in zoom-in-95 duration-300 rounded-sm"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black transition-colors"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>

        {/* Content */}
        <div className="flex flex-col items-center">
            {/* Logo Style Placeholder */}
            <div className="mb-6">
                <span className="text-4xl font-black tracking-tighter">MUSE<span className="text-accent underline">.</span></span>
            </div>

            {submitted ? (
                <div className="py-12 animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                         <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="green" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                    </div>
                    <h2 className="text-3xl font-serif italic mb-2 tracking-tight">You're on the list!</h2>
                    <p className="text-gray-500 font-medium">Welcome to the Muse inner circle.</p>
                </div>
            ) : (
                <>
                    <h3 className="text-sm font-bold tracking-[0.2em] uppercase mb-4 text-gray-500">
                        Exclusive Access
                    </h3>
                    
                    <h2 className="text-4xl font-serif italic mb-4 tracking-tight">
                        Unlock the Muse Experience
                    </h2>
                    
                    <p className="text-base font-medium mb-10 text-gray-500 max-w-[320px]">
                        Be the first to know about new arrivals, limited drops, and seasonal sales.
                    </p>

                    <form className="w-full space-y-4" onSubmit={handleSubmit}>
                        <div className="relative">
                            <input 
                                type="email" 
                                placeholder="your@email.com" 
                                className="w-full border border-gray-200 p-4 outline-none focus:border-black transition-colors text-center font-medium"
                                required
                            />
                        </div>
                        
                        <button 
                            type="submit"
                            className="w-full bg-accent text-white py-4 font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-opacity active:scale-[0.98]"
                        >
                            Keep Me Updated
                        </button>
                    </form>

                    <button 
                        onClick={handleClose}
                        className="mt-6 text-xs underline font-bold hover:text-gray-500 transition-colors uppercase tracking-widest"
                    >
                        No Thanks
                    </button>
                </>
            )}

            <p className="mt-8 text-[9px] text-gray-400 leading-relaxed max-w-[300px] uppercase tracking-widest font-bold">
                By subscribing, you agree to receive marketing updates from MUSE.
            </p>
        </div>
      </div>
    </div>
  );
}
