"use client";

import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star } from "lucide-react";
import Link from "next/link";
import { Game } from "@/types";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

export function GameCard({ game }: { game: Game }) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  
  const inWishlist = isInWishlist(game.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(game.id);
    } else {
      addToWishlist(game);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(game);
  };

  return (
    <Link href={`/game/${game.id}`}>
      <motion.div 
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="glass-card overflow-hidden group relative flex flex-col h-full"
      >
        {/* Cover Image Container */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-secondary/50">
          {/* We'll use img for now to easily show local public images without configuring Next.js domains */}
          <img 
            src={game.coverImage} 
            alt={game.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Wishlist Button Overlay */}
          <button 
            onClick={toggleWishlist}
            className={`absolute top-3 right-3 p-2 rounded-full glass hover:bg-white/20 transition-colors z-10 ${inWishlist ? 'text-accent' : 'text-white'}`}
          >
            <Heart className={`h-4 w-4 ${inWishlist ? 'fill-accent' : ''}`} />
          </button>
          
          {/* Quick Add Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
            <button 
              onClick={handleAddToCart}
              className="bg-accent/90 hover:bg-accent text-primary font-bold py-2 px-6 rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg text-white line-clamp-1">{game.title}</h3>
              <div className="flex items-center gap-1 text-yellow-400 text-xs font-medium">
                <Star className="h-3 w-3 fill-yellow-400" />
                {game.rating}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {game.categories.slice(0, 2).map(cat => (
                <span key={cat} className="text-[10px] uppercase font-bold text-gray-400 bg-white/5 px-2 py-1 rounded-sm">
                  {cat}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-2 pt-3 border-t border-white/10">
            <span className="text-gray-400 text-xs">{game.developer}</span>
            <span className="font-black text-white text-lg">${game.price}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
