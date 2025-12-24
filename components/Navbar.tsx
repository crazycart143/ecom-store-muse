"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/cart-context";
import { CartDropdown } from "./CartDropdown";
import { SearchModal } from "./SearchModal";

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
      <nav className="w-full bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold tracking-tight text-secondary">
                MUSE<span className="text-accent">.</span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              <Link href="/" className="text-secondary hover:text-accent transition-colors font-medium">Home</Link>
              <Link href="/shop" className="text-secondary hover:text-accent transition-colors font-medium">Shop</Link>
              <Link href="/about" className="text-secondary hover:text-accent transition-colors font-medium">About</Link>
            </div>

            {/* Icons / Actions */}
            <div className="hidden md:flex items-center space-x-6">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="text-secondary hover:text-accent transition-colors"
              >
                <span className="sr-only">Search</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </button>
              <button 
                id="cart-icon-btn"
                onClick={() => setIsCartOpen(!isCartOpen)}
                className={`text-secondary hover:text-accent transition-all relative ${isBumping ? 'scale-125 text-accent' : 'scale-100'}`}
              >
                <span className="sr-only">Cart</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in duration-200">
                    {totalItems}
                  </span>
                )}
              </button>
              <CartDropdown />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
                 <button 
                    onClick={() => setIsSearchOpen(true)}
                    className="text-secondary hover:text-accent transition-colors"
                  >
                    <span className="sr-only">Search</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-secondary hover:text-accent focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                ) : (
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-secondary/10">
            <div className="px-4 pt-2 pb-4 space-y-1 sm:px-3 flex flex-col">
              <Link href="/" className="block px-3 py-2 text-base font-medium text-secondary hover:text-accent hover:bg-gray-50 rounded-md">Home</Link>
              <Link href="/shop" className="block px-3 py-2 text-base font-medium text-secondary hover:text-accent hover:bg-gray-50 rounded-md">Shop</Link>
              <Link href="/about" className="block px-3 py-2 text-base font-medium text-secondary hover:text-accent hover:bg-gray-50 rounded-md">About</Link>
              <Link href="/cart" className="block px-3 py-2 text-base font-medium text-secondary hover:text-accent hover:bg-gray-50 rounded-md">Cart ({totalItems})</Link>
            </div>
          </div>
        )}
      </nav>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
