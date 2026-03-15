"use client";

import { useWishlist } from "@/context/WishlistContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GameCard } from "@/components/GameCard";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <div className="min-h-screen flex flex-col pt-20">
      <Navbar />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-4 mb-12">
          <h1 className="text-4xl font-black text-white neon-text">WISHLIST</h1>
          <div className="h-1 flex-1 bg-white/10 rounded-full" />
        </div>

        {wishlist.length === 0 ? (
          <div className="glass-panel rounded-2xl p-16 flex flex-col items-center justify-center text-center">
            <Heart className="h-24 w-24 text-gray-500 mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Your wishlist is lonely</h2>
            <p className="text-gray-400 max-w-md mb-8">
              Keep track of games you want to play. Add them to your wishlist to get notified of sales and releases.
            </p>
            <Link 
              href="/store"
              className="bg-accent hover:bg-[#00e35a] text-primary font-bold py-3 px-8 rounded-full transition-colors"
            >
              Discover Games
            </Link>
          </div>
        ) : (
          <div>
            <div className="mb-6 text-gray-400 text-sm">
              Tracking <span className="text-white font-bold">{wishlist.length}</span> games
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlist.map(game => (
                <div key={game.id} className="h-[400px]">
                  <GameCard game={game} />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
