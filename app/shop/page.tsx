"use client";

import { useMemo, useState } from "react";
import { products } from "@/lib/mock-data";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { QuickViewModal } from "@/components/QuickViewModal";
import { Product } from "@/lib/mock-data";

const CATEGORIES = ["All", "Tops", "Bottoms", "Outerwear", "Footwear", "Accessories"];
const SORT_OPTIONS = [
    { label: "Newest", value: "newest" },
    { label: "Price: Low to High", value: "price_asc" },
    { label: "Price: High to Low", value: "price_desc" },
];

export default function Shop() {
   const [activeCategory, setActiveCategory] = useState("All");
  const [sortValue, setSortValue] = useState("newest");
  const [priceRange, setPriceRange] = useState<{min: string, max: string}>({ min: "", max: "" });
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Mobile filter toggle
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    let result = products;

    // Category Filter
    if (activeCategory !== "All") {
      result = result.filter((product) => product.category === activeCategory);
    }

    // Price Filter
    const min = parseFloat(priceRange.min);
    const max = parseFloat(priceRange.max);
    if (!isNaN(min)) {
        result = result.filter(p => p.price >= min);
    }
    if (!isNaN(max)) {
        result = result.filter(p => p.price <= max);
    }

    // Sort
    if (sortValue === "price_asc") {
        result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortValue === "price_desc") {
        result = [...result].sort((a, b) => b.price - a.price);
    } else {
        // Default relative to ID/Placement in mock data as proxy for 'newest'
        result = [...result].reverse(); 
    }

    return result;
  }, [activeCategory, sortValue, priceRange]);

  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="bg-secondary text-primary py-16 px-4 text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">SHOP ALL</h1>
        <p className="text-gray-300">Discover our full range of essentials.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs />
      <div className="flex flex-col lg:flex-row items-start mb-12 gap-12">
            
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden flex justify-between items-center mb-6">
                <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="flex items-center gap-2 font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
                    Filters
                </button>
                <span className="text-gray-500">{filteredProducts.length} Products</span>
            </div>

            {/* Sidebar Filters */}
            <aside className={`lg:w-64 flex-shrink-0 ${isFilterOpen ? 'block' : 'hidden lg:block'} space-y-8`}>
                {/* Categories */}
                <div>
                    <h3 className="font-bold mb-4 text-lg">Categories</h3>
                    <div className="space-y-2">
                        {CATEGORIES.map(cat => (
                            <button 
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`block w-full text-left py-1 hover:text-gray-600 transition-colors ${activeCategory === cat ? 'font-bold underline' : 'text-gray-500'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Price */}
                <div>
                    <h3 className="font-bold mb-4 text-lg">Price</h3>
                    <div className="flex gap-2 items-center">
                        <input 
                            type="number" 
                            placeholder="Min" 
                            value={priceRange.min}
                            onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                            className="w-20 border border-gray-200 rounded p-2 text-sm"
                        />
                        <span>-</span>
                        <input 
                            type="number" 
                            placeholder="Max" 
                            value={priceRange.max}
                            onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                            className="w-20 border border-gray-200 rounded p-2 text-sm"
                        />
                    </div>
                </div>
            </aside>

            {/* Product Grid & Sort */}
            <div className="flex-1">
                <div className="flex justify-between items-center mb-8">
                    <span className="hidden lg:block text-gray-500">{filteredProducts.length} Products</span>
                    <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-500">Sort by:</label>
                        <select 
                            value={sortValue} 
                            onChange={(e) => setSortValue(e.target.value)}
                            className="border-none bg-transparent font-medium focus:ring-0 cursor-pointer"
                        >
                            {SORT_OPTIONS.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
                    {filteredProducts.map((product) => (
                    <ProductCard 
                        key={product.id} 
                        product={product} 
                        onQuickView={() => setQuickViewProduct(product)}
                    />
                    ))}
                    {filteredProducts.length === 0 && (
                        <div className="col-span-full text-center py-24 text-gray-400">
                            No products match your filters.
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>
      <QuickViewModal 
        product={quickViewProduct} 
        isOpen={!!quickViewProduct} 
        onClose={() => setQuickViewProduct(null)} 
      />
    </div>
  );
}
