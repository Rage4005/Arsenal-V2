"use client";

import { notFound } from "next/navigation";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Game } from "@/types";
import ClientActions from "./ClientActions";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Star, Calendar, MonitorPlay, Award, Users, ShieldCheck, Gamepad2, Building2 } from "lucide-react";

export default function GameDetailsPage({ params }: { params: { id: string } }) {
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGame() {
      try {
        const docRef = doc(db, "games", params.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setGame(docSnap.data() as Game);
        } else {
          console.error("No such document!");
          setGame(null);
        }
      } catch (error) {
        console.error("Error fetching document:", error);
        setGame(null);
      } finally {
        setLoading(false);
      }
    }

    fetchGame();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-primary">
        <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
        <p className="text-white mt-4 font-bold">Loading game intel...</p>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="min-h-screen flex flex-col bg-primary">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-black mb-4">404 - GAME NOT FOUND</h1>
          <p className="text-gray-400">The game you are looking for does not exist in our database.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-primary relative">
      <Navbar />

      <main className="flex-1 pb-24 relative z-10 w-full">
        {/* Banner Section */}
        <section className="relative h-[60vh] min-h-[500px] w-full">
          <div className="absolute inset-0 z-0">
            <img 
              src={game.bannerImage} 
              alt={game.title} 
              className="w-full h-full object-cover object-center filter brightness-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-12">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-lg">{game.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-300 text-sm font-medium">
              <span className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm"><Calendar className="h-4 w-4 text-accent" /> {game.releaseDate}</span>
              <span className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm"><Building2 className="h-4 w-4 text-accent" /> {game.developer}</span>
              <span className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm"><Gamepad2 className="h-4 w-4 text-accent" /> {game.platform.join(", ")}</span>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="h-6 w-1 bg-accent rounded-full" />
                  About the Game
                </h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 text-lg leading-relaxed">{game.description}</p>
                </div>
              </div>

              {/* Media Section */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="h-6 w-1 bg-accent rounded-full" />
                  Media
                </h2>
                <div className="aspect-video w-full rounded-xl overflow-hidden glass-panel relative group cursor-pointer">
                  <img src={game.coverImage} alt="Gameplay" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                    <div className="h-16 w-16 rounded-full bg-accent/90 text-primary flex items-center justify-center backdrop-blur-md shadow-[0_0_30px_rgba(0,255,102,0.4)] group-hover:scale-110 transition-transform">
                       <MonitorPlay className="h-8 w-8 ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="glass-panel rounded-2xl p-6 sticky top-28">
                <div className="mb-6">
                  <span className="text-4xl font-black text-white">${game.price.toFixed(2)}</span>
                </div>
                
                <ClientActions game={game} />
                
                <div className="mt-6 space-y-4 pt-6 border-t border-white/10 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 flex items-center gap-2"><Star className="h-4 w-4" /> Rating</span>
                    <span className="text-white font-bold bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded">{game.rating} / 5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 flex items-center gap-2"><Building2 className="h-4 w-4" /> Publisher</span>
                    <span className="text-white font-medium">{game.publisher}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 mt-6 bg-white/5 p-3 rounded-xl border border-white/10">
                    <ShieldCheck className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-xs">Secure Transaction. Returns available within 14 days of purchase.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
