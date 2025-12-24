"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Product } from "./mock-data";
import { FlyingImage } from "@/components/FlyingImage";

export interface CartItem {
  id: string; // unique cart item id (product.id + size)
  productId: string;
  product: Product;
  quantity: number;
  size?: string;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  addItem: (product: Product, size?: string, startRect?: DOMRect) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [flyingItem, setFlyingItem] = useState<{ src: string; startRect: DOMRect } | null>(null);
  const [pendingProduct, setPendingProduct] = useState<(Product & { selectedSize?: string }) | null>(null);

  // Load from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addToState = useCallback((product: Product, size?: string) => {
      setItems((prev) => {
        const cartItemId = size ? `${product.id}-${size}` : product.id;
        const existing = prev.find((item) => item.id === cartItemId);
        
        if (existing) {
          return prev.map((item) =>
            item.id === cartItemId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prev, { id: cartItemId, productId: product.id, product, quantity: 1, size }];
      });
  }, []);

  const addItem = (product: Product, size?: string, startRect?: DOMRect) => {
    if (startRect) {
        setFlyingItem({ src: product.image, startRect });
        setPendingProduct({ ...product, selectedSize: size }); // temp storage for animation
        // We do NOT add to cart yet, wait for animation
    } else {
        addToState(product, size);
        setIsOpen(true);
    }
  };

  const handleAnimationComplete = useCallback(() => {
      setFlyingItem(null);
      if (pendingProduct) {
          // @ts-ignore - using temp property for size relay
          addToState(pendingProduct, pendingProduct.selectedSize);
          setPendingProduct(null);
          setIsOpen(true); // Open cart after animation
      }
  }, [pendingProduct, addToState]);

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        setIsOpen,
        addItem,
        removeItem,
        updateQuantity,
        totalItems,
        subtotal,
      }}
    >
      {children}
      {flyingItem && (
          <FlyingImage 
            src={flyingItem.src} 
            startRect={flyingItem.startRect} 
            targetSelector="#cart-icon-btn svg" 
            onComplete={handleAnimationComplete} 
          />
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
