"use client";

import { useCart } from "@/context/CartContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, cartTotal, clearCart } = useCart();

  return (
    <div className="min-h-screen flex flex-col pt-20">
      <Navbar />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-4 mb-12">
          <h1 className="text-4xl font-black text-white neon-text">YOUR CART</h1>
          <div className="h-1 flex-1 bg-white/10 rounded-full" />
        </div>

        {cart.length === 0 ? (
          <div className="glass-panel rounded-2xl p-16 flex flex-col items-center justify-center text-center">
            <ShoppingBag className="h-24 w-24 text-gray-500 mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Your cart is empty</h2>
            <p className="text-gray-400 max-w-md mb-8">
              Looks like you haven't added any games to your cart yet. Discover your next favorite game in our store.
            </p>
            <Link 
              href="/store"
              className="bg-accent hover:bg-[#00e35a] text-primary font-bold py-3 px-8 rounded-full transition-colors"
            >
              Browse Store
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex justify-between items-center mb-6 pb-6 border-b border-white/10">
                  <h3 className="text-xl font-bold text-white">Items ({cart.length})</h3>
                  <button 
                    onClick={clearCart}
                    className="text-sm text-gray-400 hover:text-red-400 transition-colors flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" /> Clear All
                  </button>
                </div>
                
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-6 items-start p-4 hover:bg-white/5 rounded-xl transition-colors border border-transparent hover:border-white/10">
                      <div className="w-32 aspect-[3/4] flex-shrink-0 bg-secondary rounded-lg overflow-hidden">
                        <img 
                          src={item.coverImage} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 flex flex-col h-full justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <Link href={`/game/${item.id}`} className="font-bold text-xl text-white hover:text-accent transition-colors">
                              {item.title}
                            </Link>
                            <span className="font-black text-white text-lg">${item.price}</span>
                          </div>
                          <p className="text-gray-400 text-sm line-clamp-2 mb-4">{item.description}</p>
                          <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">Digital Download</span>
                        </div>
                        
                        <div className="flex justify-between items-center mt-4">
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-400 text-sm font-medium transition-colors flex items-center gap-2"
                          >
                            <Trash2 className="h-4 w-4" /> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="glass-panel p-6 rounded-2xl sticky top-28">
                <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6 pb-6 border-b border-white/10 text-gray-300">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-end mb-8">
                  <span className="text-white font-bold text-lg">Estimated Total</span>
                  <span className="text-3xl font-black text-white">${cartTotal.toFixed(2)}</span>
                </div>
                
                <button className="w-full bg-accent hover:bg-[#00e35a] text-primary font-black py-4 rounded-xl transition-colors text-lg uppercase tracking-wide">
                  Proceed to Checkout
                </button>
                
                <p className="text-xs text-center text-gray-500 mt-4">
                  By proceeding, you agree to the Terms of Sale and Privacy Policy. All sales of digital content are final.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
