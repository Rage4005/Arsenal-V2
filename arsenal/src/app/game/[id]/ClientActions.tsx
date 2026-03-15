"use client";

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Game } from "@/types";
import { ShoppingCart, Heart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ClientActions({ game }: { game: Game }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const router = useRouter();

  const inWishlist = isInWishlist(game.id);

  const handleBuyNow = () => {
    addToCart(game);
    router.push("/cart");
  };

  const handleAddToCart = () => {
    addToCart(game);
  };

  const toggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(game.id);
    } else {
      addToWishlist(game);
    }
  };

  return (
    <div className="space-y-3">
      <button 
        onClick={handleBuyNow}
        className="w-full bg-accent hover:bg-[#00e35a] text-primary font-bold py-3.5 px-6 rounded-xl transition-colors text-lg"
      >
        Buy Now
      </button>
      <button 
        onClick={handleAddToCart}
        className="w-full glass hover:bg-white/10 text-white font-medium py-3.5 px-6 rounded-xl transition-colors border border-white/20 flex items-center justify-center gap-2"
      >
        <ShoppingCart className="h-5 w-5" />
        Add to Cart
      </button>
      <button 
        onClick={toggleWishlist}
        className="w-full glass hover:bg-white/10 text-white font-medium py-3.5 px-6 rounded-xl transition-colors border border-white/20 flex items-center justify-center gap-2"
      >
        <Heart className={`h-5 w-5 ${inWishlist ? 'fill-accent text-accent' : ''}`} />
        {inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
      </button>
    </div>
  );
}
