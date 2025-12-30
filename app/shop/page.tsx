"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { getProducts, Product, collections } from "@/lib/mock-data";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { QuickViewModal } from "@/components/QuickViewModal";
import { useSearchParams } from "next/navigation";

/* ----------------------------------------
   Categories (Fake Store aligned)
---------------------------------------- */
const CATEGORIES = ["All", "Men", "Women", "Electronics", "Jewelry"];

const CATEGORY_MAP: Record<string, string> = {
  Men: "men's clothing",
  Women: "women's clothing",
  Electronics: "electronics",
  Jewelry: "jewelery",
};

const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const collectionHandle = searchParams.get("collection");

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortValue, setSortValue] = useState("newest");
  const [priceRange, setPriceRange] = useState<{ min: string; max: string }>({
    min: "",
    max: "",
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] =
    useState<Product | null>(null);

  /* ----------------------------------------
     Active collection (visual only)
  ---------------------------------------- */
  const activeCollection = useMemo(() => {
    return collections.find((c) => c.handle === collectionHandle);
  }, [collectionHandle]);

  /* ----------------------------------------
     Fetch products (ONCE)
  ---------------------------------------- */
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const data = await getProducts();
      setAllProducts(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  /* ----------------------------------------
     Filters + Sort
  ---------------------------------------- */
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Category filter
    if (activeCategory !== "All" && CATEGORY_MAP[activeCategory]) {
      result = result.filter(
        (p) => p.category === CATEGORY_MAP[activeCategory]
      );
    }

    // Price filter
    const min = parseFloat(priceRange.min);
    const max = parseFloat(priceRange.max);

    if (!isNaN(min)) {
      result = result.filter((p) => p.price >= min);
    }
    if (!isNaN(max)) {
      result = result.filter((p) => p.price <= max);
    }

    // Sort
    if (sortValue === "price_asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortValue === "price_desc") {
      result.sort((a, b) => b.price - a.price);
    } else {
      result.reverse(); // newest proxy
    }

    return result;
  }, [allProducts, activeCategory, sortValue, priceRange]);

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header */}
      <div className="bg-secondary text-primary py-16 px-4 text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4 uppercase">
          {activeCollection
            ? activeCollection.title
            : activeCategory !== "All"
            ? activeCategory
            : "Shop All"}
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          {activeCollection
            ? activeCollection.description
            : "Discover our full range of essentials and timeless designs."}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs />

        <div className="flex flex-col lg:flex-row items-start mb-12 gap-12">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex justify-between items-center mb-6">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 font-medium"
            >
              Filters
            </button>
            <span className="text-gray-500">
              {filteredProducts.length} Products
            </span>
          </div>

          {/* Sidebar */}
          <aside
            className={`lg:w-64 flex-shrink-0 ${
              isFilterOpen ? "block" : "hidden lg:block"
            } space-y-8`}
          >
            {/* Categories */}
            <div>
              <h3 className="font-bold mb-4 text-lg">Categories</h3>
              <div className="space-y-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`block w-full text-left py-1 transition-colors ${
                      activeCategory === cat
                        ? "font-bold underline"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
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
                  onChange={(e) =>
                    setPriceRange((prev) => ({
                      ...prev,
                      min: e.target.value,
                    }))
                  }
                  className="w-20 border border-gray-200 rounded p-2 text-sm"
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) =>
                    setPriceRange((prev) => ({
                      ...prev,
                      max: e.target.value,
                    }))
                  }
                  className="w-20 border border-gray-200 rounded p-2 text-sm"
                />
              </div>
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <span className="hidden lg:block text-gray-500">
                {filteredProducts.length} Products
              </span>
              <select
                value={sortValue}
                onChange={(e) => setSortValue(e.target.value)}
                className="border-none bg-transparent font-medium cursor-pointer"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-4 md:gap-x-8">
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="space-y-4">
                    <div className="aspect-[3/4] bg-gray-100 rounded-lg" />
                    <div className="h-4 bg-gray-100 w-2/3" />
                  </div>
                ))
              ) : (
                <>
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
                </>
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

export default function Shop() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
            Loading Muse Catalog...
          </p>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
