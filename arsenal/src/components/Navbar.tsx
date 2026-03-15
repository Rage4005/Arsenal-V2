"use client";

import Link from "next/link";
import { Search, ShoppingCart, Heart, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function Navbar() {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/store?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Main Links */}
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-black italic tracking-wider text-white neon-text glow-accent">
              ARSENAL
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Home</Link>
              <Link href="/store" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Store</Link>
              <Link href="/categories" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Categories</Link>
              <Link href="/community" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Community</Link>
            </div>
          </div>

          {/* Search & Actions */}
          <div className="flex items-center gap-6">
            <form onSubmit={handleSearch} className="hidden lg:flex relative">
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent transition-all w-64 glass"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </form>

            <div className="flex items-center gap-4">
              <Link href="/wishlist" className="relative p-2 text-gray-300 hover:text-white transition-colors">
                <Heart className="h-5 w-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-0 right-0 bg-accent text-primary text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <Link href="/cart" className="relative p-2 text-gray-300 hover:text-white transition-colors">
                <ShoppingCart className="h-5 w-5" />
                {cart.length > 0 && (
                  <span className="absolute top-0 right-0 bg-accent text-primary text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </Link>
              {user ? (
                <Link href="/profile" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 px-4 py-2 rounded-full text-sm font-medium transition-all backdrop-blur-md">
                   {user.photoURL ? (
                     <img src={user.photoURL} alt="User" className="h-6 w-6 rounded-full" />
                   ) : (
                     <User className="h-4 w-4" />
                   )}
                   <span className="hidden sm:inline">{user.displayName || 'Profile'}</span>
                </Link>
              ) : (
                <Link href="/login" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 px-4 py-2 rounded-full text-sm font-medium transition-all backdrop-blur-md">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Sign In</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
