"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Game } from "@/types";

interface WishlistContextType {
  wishlist: Game[];
  addToWishlist: (game: Game) => void;
  removeFromWishlist: (gameId: string) => void;
  isInWishlist: (gameId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlist, setWishlist] = useState<Game[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("arsenal_wishlist");
    if (stored) {
      try {
        setWishlist(JSON.parse(stored));
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("arsenal_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (game: Game) => {
    setWishlist((prev) => {
      if (prev.some((g) => g.id === game.id)) return prev;
      return [...prev, game];
    });
  };

  const removeFromWishlist = (gameId: string) => {
    setWishlist((prev) => prev.filter((g) => g.id !== gameId));
  };

  const isInWishlist = (gameId: string) => wishlist.some((g) => g.id === gameId);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
};
