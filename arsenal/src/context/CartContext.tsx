"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Game, CartItem } from "@/types";

interface CartContextType {
  cart: CartItem[];
  addToCart: (game: Game) => void;
  removeFromCart: (gameId: string) => void;
  clearCart: () => void;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("arsenal_cart");
    if (stored) {
      try {
        setCart(JSON.parse(stored));
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("arsenal_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (game: Game) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === game.id);
      if (existing) return prev; // Since games are usually digital one-time purchases
      return [...prev, { ...game, quantity: 1 }];
    });
  };

  const removeFromCart = (gameId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== gameId));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
