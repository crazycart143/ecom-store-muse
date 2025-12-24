"use client";

import { searchProducts, Product } from "@/lib/mock-data";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TRENDING_SEARCHES = ["Oversized", "Vintage", "Minimalist", "Sneakers", "Denim"];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
        setQuery("");
        setResults([]);
    }
  }, [isOpen]);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
        setResults([]);
        return;
    }

    const timer = setTimeout(async () => {
        setLoading(true);
        const data = await searchProducts(query);
        setResults(data);
        setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-white animate-in fade-in duration-300">
      <div className="h-full flex flex-col pt-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        
        {/* Header/Close */}
        <div className="flex justify-between items-center mb-12">
            <span className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase">Search Store</span>
            <button 
                onClick={onClose} 
                className="group flex items-center gap-2 text-sm font-bold hover:text-accent transition-colors"
                aria-label="Close search modal"
            >
                CLOSE
                <span className="p-2 border border-black/10 rounded-full group-hover:border-accent transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </span>
            </button>
        </div>

        {/* Search Input Area */}
        <div className="relative mb-12">
          <label htmlFor="search-input" className="sr-only">Search products</label>
          <div className="flex items-center border-b-2 border-black/5 focus-within:border-black transition-colors py-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300 mr-4"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input
                id="search-input"
                ref={inputRef}
                type="text"
                placeholder="Search our catalog..."
                className="w-full text-xl md:text-3xl font-bold tracking-tight bg-transparent border-none outline-none placeholder:text-gray-200"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search items"
            />
            {loading && (
                <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin ml-4" />
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto pb-12">
            {!query && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                        Trending Searches
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {TRENDING_SEARCHES.map((tag) => (
                            <button 
                                key={tag}
                                onClick={() => setQuery(tag)}
                                className="px-5 py-2 rounded-full border border-gray-100 bg-gray-50/50 hover:bg-black hover:text-white hover:border-black transition-all text-xs font-bold uppercase tracking-widest"
                                aria-label={`Search for ${tag}`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {results.length > 0 && (
                <div className="space-y-8 animate-in fade-in duration-500">
                    <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase">Products Found ({results.length})</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
                        {results.map((product, idx) => (
                            <Link 
                                key={product.id} 
                                href={`/product/${product.handle}`} 
                                onClick={onClose}
                                className="group flex gap-5 items-center animate-in fade-in slide-in-from-bottom-4 duration-500"
                                style={{ animationDelay: `${idx * 50}ms` }}
                            >
                                <div className="relative w-20 h-24 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                                    <Image 
                                        src={product.image} 
                                        alt={product.title} 
                                        fill 
                                        className="object-cover group-hover:scale-110 transition-transform duration-500" 
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-accent uppercase tracking-wider mb-1">{product.category}</span>
                                    <h4 className="font-bold text-secondary group-hover:text-accent transition-colors leading-tight line-clamp-1">{product.title}</h4>
                                    <p className="font-medium text-gray-400 mt-1">${product.price}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {query && !loading && results.length === 0 && (
                <div className="text-center py-20 animate-in fade-in zoom-in duration-300">
                    <p className="text-gray-400 text-lg">No results found for <span className="text-secondary font-bold">"{query}"</span></p>
                    <button onClick={() => setQuery("")} className="mt-4 text-accent font-bold underline underline-offset-4 hover:text-black transition-colors">Clear Search</button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
