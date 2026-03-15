"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GameCard } from "@/components/GameCard";
import { Game } from "@/types";
import { Filter, Search as SearchIcon } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

function StoreContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(100);

  const [games, setGames] = useState<Game[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [allPlatforms, setAllPlatforms] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGames() {
      try {
        const querySnapshot = await getDocs(collection(db, "games"));
        const gamesList: Game[] = [];
        const cats = new Set<string>();
        const plats = new Set<string>();

        querySnapshot.forEach((doc) => {
          const game = doc.data() as Game;
          gamesList.push(game);
          game.categories.forEach(c => cats.add(c));
          game.platform.forEach(p => plats.add(p));
        });

        setGames(gamesList);
        setAllCategories(Array.from(cats));
        setAllPlatforms(Array.from(plats));
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchGames();
  }, []);

  useEffect(() => {
    setSearchQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const togglePlatform = (plat: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(plat) ? prev.filter(p => p !== plat) : [...prev, plat]
    );
  };

  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesSearch = 
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.developer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.categories.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat = selectedCategories.length === 0 || 
        selectedCategories.some(c => game.categories.includes(c));

      const matchesPlat = selectedPlatforms.length === 0 || 
        selectedPlatforms.some(p => game.platform.includes(p));

      const matchesPrice = game.price <= maxPrice;

      return matchesSearch && matchesCat && matchesPlat && matchesPrice;
    });
  }, [searchQuery, selectedCategories, selectedPlatforms, maxPrice, games]);

  return (
    <>
      <div className="flex items-center gap-4 mb-12">
        <h1 className="text-4xl font-black text-white neon-text">STORE</h1>
        <div className="h-1 flex-1 bg-white/10 rounded-full" />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-72 flex-shrink-0 space-y-8">
          <div className="glass-panel p-6 rounded-2xl">
            <div className="flex items-center gap-2 mb-6 text-white font-bold border-b border-white/10 pb-4">
              <Filter className="h-5 w-5" />
              Filters
            </div>

            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Search</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search titles, genres..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent transition-all glass"
                />
                <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Max Price</h3>
                <span className="text-accent font-bold">${maxPrice}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>

            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Platform</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
                {allPlatforms.map(plat => (
                  <label key={plat} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input 
                        type="checkbox" 
                        checked={selectedPlatforms.includes(plat)}
                        onChange={() => togglePlatform(plat)}
                        className="peer appearance-none w-5 h-5 border border-gray-500 rounded bg-transparent checked:bg-accent checked:border-accent transition-all"
                      />
                      <svg className="absolute w-3 h-3 text-primary opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{plat}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Genre</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar pr-2">
                {allCategories.map(cat => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input 
                        type="checkbox" 
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                        className="peer appearance-none w-5 h-5 border border-gray-500 rounded bg-transparent checked:bg-accent checked:border-accent transition-all"
                      />
                      <svg className="absolute w-3 h-3 text-primary opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>
        </aside>

        <div className="flex-1">
          <div className="mb-6 text-gray-400 text-sm">
            Showing <span className="text-white font-bold">{filteredGames.length}</span> results
          </div>
          
          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGames.map(game => (
                <div key={game.id} className="h-[400px]">
                  <GameCard game={game} />
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-panel rounded-2xl p-12 flex flex-col items-center justify-center text-center h-[50vh]">
              <SearchIcon className="h-16 w-16 text-gray-500 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">No games found</h2>
              <p className="text-gray-400 max-w-md">
                We couldn't find any games matching your current filters. Try adjusting your search or clearing some filters.
              </p>
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategories([]);
                  setSelectedPlatforms([]);
                  setMaxPrice(100);
                }}
                className="mt-6 text-accent hover:text-[#00e35a] font-medium transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default function StorePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Suspense fallback={<div className="text-white text-center py-20">Loading store...</div>}>
          <StoreContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
