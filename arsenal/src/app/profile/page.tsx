"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GameCard } from "@/components/GameCard";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User,
  Settings,
  CreditCard,
  Clock,
  Shield,
  ShieldCheck,
  Bell,
  ChevronRight,
  LogOut,
  Gamepad2,
  Heart,
  ShoppingBag
} from "lucide-react";

import gamesData from "@/data/games.json";
import { Game } from "@/types";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("collection");
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  // Mock data for user's collection
  const games: Game[] = gamesData as Game[];
  const purchasedGames = [games[0], games[2]];

  // Mock order history
  const orders = [
    { id: "ORD-9283-XO", date: "2023-11-15", total: 59.99, items: ["Hogwarts Legacy"] },
    { id: "ORD-9431-AL", date: "2023-10-02", total: 49.99, items: ["Cyberpunk 2077"] },
    { id: "ORD-8820-PK", date: "2023-08-21", total: 29.99, items: ["Stray"] },
  ];

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-primary">
        <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
        <p className="text-white mt-4 font-bold">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-primary relative">
      <Navbar />

      {/* Decorative background blur */}
      <div className="absolute top-0 right-0 w-full max-w-2xl h-96 bg-accent opacity-[0.03] blur-[120px] rounded-full pointer-events-none"></div>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">

          {/* Sidebar */}
          <aside className="w-full md:w-80 flex-shrink-0">
            <div className="glass-panel p-6 rounded-3xl sticky top-24">
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/10">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-accent to-[#00aa4d] flex items-center justify-center shadow-[0_0_20px_rgba(0,255,102,0.3)]">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="User avatar" className="h-full w-full object-cover rounded-2xl" />
                  ) : (
                    <User className="h-8 w-8 text-primary" />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white max-w-[180px] break-words">{user.displayName || "Commander"}</h2>
                  <p className="text-sm text-accent">Level 42</p>
                </div>
              </div>

              <nav className="space-y-2">
                <a href="#games" className="flex items-center gap-3 w-full bg-white/10 text-white font-medium py-3 px-4 rounded-xl transition-colors hover:bg-white/20">
                  <Gamepad2 className="h-5 w-5 text-accent" />
                  My Collection
                </a>
                <Link href="/wishlist" className="flex items-center gap-3 w-full text-gray-400 font-medium py-3 px-4 rounded-xl transition-colors hover:bg-white/5 hover:text-white">
                  <Heart className="h-5 w-5" />
                  Wishlist
                </Link>
                <a href="#orders" className="flex items-center gap-3 w-full text-gray-400 font-medium py-3 px-4 rounded-xl transition-colors hover:bg-white/5 hover:text-white">
                  <ShoppingBag className="h-5 w-5" />
                  Order History
                </a>
                <a href="#settings" className="flex items-center gap-3 w-full text-gray-400 font-medium py-3 px-4 rounded-xl transition-colors hover:bg-white/5 hover:text-white">
                  <Settings className="h-5 w-5" />
                  Account Settings
                </a>
              </nav>

              <div className="mt-8 pt-6 border-t border-white/10">
                <button 
                  onClick={() => logout()}
                  className="w-full flex items-center justify-between p-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <LogOut className="h-5 w-5" />
                    <span className="font-medium">Sign Out</span>
                  </div>
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 space-y-12">
            
            {/* My Collection Section */}
            <section id="games">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="h-6 w-1 bg-accent rounded-full" />
                My Collection
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {purchasedGames.map(game => (
                  <div key={game.id} className="glass border border-white/10 rounded-xl overflow-hidden flex h-32 hover:border-white/20 transition-all group cursor-pointer">
                    <div className="w-24 flex-shrink-0 bg-secondary relative">
                      <img src={game.coverImage} className="w-full h-full object-cover" alt="" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="text-white text-xs font-bold bg-accent/80 px-2 py-1 rounded">PLAY</div>
                      </div>
                    </div>
                    <div className="p-4 flex flex-col justify-center flex-1">
                      <h4 className="font-bold text-white text-lg mb-1">{game.title}</h4>
                      <p className="text-gray-400 text-xs mb-2">Purchased {game.releaseDate}</p>
                      <div className="w-full bg-white/10 h-1.5 rounded-full mt-auto">
                        <div className="bg-accent h-1.5 rounded-full" style={{ width: '0%' }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">0 hrs played</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

             {/* Order History Section */}
             <section id="orders">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="h-6 w-1 bg-accent rounded-full" />
                Recent Orders
              </h3>
              
              <div className="glass-panel border border-white/10 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-sm text-gray-400">
                  <thead className="bg-white/5 text-gray-300 uppercase font-semibold">
                    <tr>
                      <th className="px-6 py-4 rounded-tl-2xl">Order ID</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Items</th>
                      <th className="px-6 py-4">Total</th>
                      <th className="px-6 py-4 rounded-tr-2xl text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-medium text-white">#ARS-98242</td>
                      <td className="px-6 py-4">Oct 28, 2025</td>
                      <td className="px-6 py-4">Stray</td>
                      <td className="px-6 py-4">$29.99</td>
                      <td className="px-6 py-4 text-right"><span className="text-accent bg-accent/10 px-2 py-1 rounded text-xs font-bold">COMPLETED</span></td>
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-medium text-white">#ARS-87391</td>
                      <td className="px-6 py-4">Oct 15, 2025</td>
                      <td className="px-6 py-4">Call of Duty: Modern Warfare II</td>
                      <td className="px-6 py-4">$69.99</td>
                      <td className="px-6 py-4 text-right"><span className="text-accent bg-accent/10 px-2 py-1 rounded text-xs font-bold">COMPLETED</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

             {/* Account Settings Section */}
             <section id="settings">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="h-6 w-1 bg-accent rounded-full" />
                Security & Payment
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-panel p-6 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <ShieldCheck className="h-6 w-6 text-accent" />
                    <h4 className="font-bold text-white text-lg">Account Security</h4>
                  </div>
                  <p className="text-gray-400 text-sm mb-6">Manage your password and 2-step verification settings.</p>
                  <button className="text-sm font-bold text-primary bg-white hover:bg-gray-200 py-2 px-4 rounded-lg transition-colors">
                    Update Password
                  </button>
                </div>
                
                <div className="glass-panel p-6 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <CreditCard className="h-6 w-6 text-accent" />
                    <h4 className="font-bold text-white text-lg">Payment Methods</h4>
                  </div>
                  <p className="text-gray-400 text-sm mb-6">Manage your saved credit cards and PayPal accounts.</p>
                  <button className="text-sm font-bold text-primary bg-white hover:bg-gray-200 py-2 px-4 rounded-lg transition-colors">
                    Manage Payment
                  </button>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
