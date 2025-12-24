"use client";

import { products } from "@/lib/mock-data";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const results = query 
    ? products.filter(p => p.title.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase()))
    : [];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-white/95 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-end mb-8">
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        <div className="relative mb-12">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for products..."
            className="w-full text-4xl md:text-6xl font-bold bg-transparent border-b-2 border-gray-100 focus:border-black outline-none py-4 placeholder:text-gray-200"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-y-auto max-h-[60vh]">
            {results.map(product => (
                <Link 
                    key={product.id} 
                    href={`/product/${product.handle}`} 
                    onClick={onClose}
                    className="flex gap-4 group"
                >
                    <div className="relative w-24 h-32 bg-gray-100 overflow-hidden flex-shrink-0">
                         <Image src={product.image} alt={product.title} fill className="object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div>
                        <h4 className="font-medium text-lg group-hover:underline">{product.title}</h4>
                        <p className="text-gray-500">{product.category}</p>
                        <p className="font-semibold mt-2">${product.price}</p>
                    </div>
                </Link>
            ))}
            {query && results.length === 0 && (
                <p className="text-gray-500 text-lg col-span-full text-center py-12">
                    No results found for "{query}"
                </p>
            )}
        </div>
      </div>
    </div>
  );
}
