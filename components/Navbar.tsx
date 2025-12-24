"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/cart-context";
import { CartDropdown } from "./CartDropdown";
import { SearchModal } from "./SearchModal";
import Image from "next/image";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { totalItems, isOpen: isCartOpen, setIsOpen: setIsCartOpen } = useCart();
  const [isBumping, setIsBumping] = useState(false);

  // Trigger bump animation when totalItems increases
  useEffect(() => {
    if (totalItems > 0) {
      setIsBumping(true);
      const timer = setTimeout(() => setIsBumping(false), 300);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  return (
    <>
      <nav className="w-full bg-white sticky top-0 z-50 border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-black tracking-tighter text-secondary">
                MUSE<span className="text-accent">.</span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-10 items-center">
              <Link href="/" className="text-secondary hover:text-accent transition-all font-bold text-sm tracking-widest uppercase">Home</Link>
              <Link href="/shop" className="text-secondary hover:text-accent transition-all font-bold text-sm tracking-widest uppercase">Shop</Link>
              <Link href="/about" className="text-secondary hover:text-accent transition-all font-bold text-sm tracking-widest uppercase">About</Link>
            </div>

            {/* Icons / Actions */}
            <div className="flex items-center space-x-5">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors relative group"
                aria-label="Open Search"
              >
                <span className="sr-only">Search</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </button>
              
              <button 
                id="cart-icon-btn"
                onClick={() => setIsCartOpen(!isCartOpen)}
                className={`p-2 hover:bg-gray-100 rounded-full transition-all relative group ${isBumping ? 'scale-110 text-accent' : 'scale-100'}`}
                aria-label={`View Cart: ${totalItems} items`}
              >
                <span className="sr-only">Cart</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                {totalItems > 0 && (
                  <span className="absolute top-1 right-1 bg-accent text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                    {totalItems}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors z-[101]"
                aria-label={isOpen ? "Close Menu" : "Open Menu"}
                aria-expanded={isOpen}
              >
                <span className="sr-only">Menu</span>
                {isOpen ? (
                   <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                ) : (
                   <div className="w-6 flex flex-col items-end gap-1.5">
                      <div className="w-full h-0.5 bg-black rounded-full" />
                      <div className="w-2/3 h-0.5 bg-black rounded-full" />
                   </div>
                )}
              </button>
              
              <div>
                <CartDropdown />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel - Full Screen */}
        <div className={`fixed inset-0 bg-white z-[100] transition-all duration-500 ease-emphasized ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'} md:hidden`}>
            <div className="h-full flex flex-col p-8 pt-24 relative bg-white">
              <div className="flex flex-col space-y-8">
                {[
                    { name: 'Home', href: '/' },
                    { name: 'Shop All', href: '/shop' },
                    { name: 'Collections', href: '/shop' },
                    { name: 'About Us', href: '/about' },
                    { name: 'Support', href: '/contact' }
                ].map((item, i) => (
                    <div key={item.name} className="overflow-hidden border-b border-black/5 pb-6">
                        <Link 
                            href={item.href} 
                            onClick={() => setIsOpen(false)}
                            className={`block text-3xl font-black tracking-tighter text-secondary hover:text-accent transition-all transform ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
                            style={{ transitionDelay: `${i * 100}ms`, transitionDuration: '600ms' }}
                        >
                            {item.name}
                        </Link>
                    </div>
                ))}
              </div>

              <div className="mt-auto pb-12">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Stay Connected</p>
                  <div className="flex gap-8 justify-center border-t border-gray-100 pt-8">
                      {[
                        { name: 'TW', label: 'Twitter', href: '#' },
                        { name: 'IG', label: 'Instagram', href: '#' },
                        { name: 'FB', label: 'Facebook', href: '#' }
                      ].map(s => (
                        <a 
                            key={s.name} 
                            href={s.href} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-xs font-black tracking-widest text-secondary hover:text-accent transition-colors"
                            aria-label={`Follow us on ${s.label}`}
                        >
                            {s.name}
                        </a>
                      ))}
                  </div>
                  <div className="mt-12 text-center text-[9px] font-bold text-gray-300 uppercase tracking-widest">
                    Privacy Policy — Shipping — Returns
                  </div>
              </div>
            </div>
        </div>
      </nav>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
