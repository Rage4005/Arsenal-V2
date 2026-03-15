import { GameCard } from "@/components/GameCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import gamesData from "@/data/games.json";
import { Game } from "@/types";
import Link from "next/link";
import { PlayCircle, Plus } from "lucide-react";

export default function Home() {
  const games: Game[] = gamesData as Game[];
  
  // Featured game for Hero Section (Hogwarts Legacy)
  const featuredGame = games.find(g => g.id === "hogwarts-legacy") || games[0];
  
  // Trending games
  const trendingGames = games.slice(0, 4);
  const newReleases = [...games].sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()).slice(0, 4);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[80vh] min-h-[600px] w-full mt-[-80px]">
          <div className="absolute inset-0 z-0">
            {/* Note: we use img for standard paths since we haven't setup Next image domains */}
            <img 
              src={featuredGame.bannerImage} 
              alt={featuredGame.title} 
              className="w-full h-full object-cover object-center filter brightness-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/40 to-transparent" />
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-24">
            <div className="max-w-2xl">
              <span className="inline-block py-1 px-3 rounded-full bg-accent text-primary text-xs font-bold uppercase tracking-wider mb-4">
                Featured Game
              </span>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-4 drop-shadow-lg neon-text">
                {featuredGame.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl drop-shadow-md">
                {featuredGame.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <Link 
                  href={`/game/${featuredGame.id}`}
                  className="bg-accent hover:bg-[#00e35a] text-primary font-bold py-3 px-8 rounded-full transition-colors flex items-center gap-2"
                >
                  Buy Now - ${featuredGame.price}
                </Link>
                <button className="glass hover:bg-white/10 text-white font-medium py-3 px-8 rounded-full transition-colors flex items-center gap-2 border border-white/20">
                  <Plus className="h-5 w-5" />
                  Add to Wishlist
                </button>
                <button className="glass hover:bg-white/10 text-white font-medium py-3 px-8 rounded-full transition-colors flex items-center gap-2 border border-white/20">
                  <PlayCircle className="h-5 w-5" />
                  Watch Trailer
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Trending Section */}
        <section className="py-16 bg-primary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Trending Now</h2>
                <div className="h-1 w-20 bg-accent rounded-full" />
              </div>
              <Link href="/store" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                View All
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingGames.map(game => (
                <div key={`trending-${game.id}`} className="h-[400px]">
                  <GameCard game={game} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* New Releases Section */}
        <section className="py-16 bg-secondary/30 relative overflow-hidden backdrop-blur-sm">
          {/* Decorative blur blob */}
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px] -translate-y-1/2 -z-10" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">New Releases</h2>
                <div className="h-1 w-20 bg-accent rounded-full" />
              </div>
              <Link href="/store" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                View All
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newReleases.map(game => (
                <div key={`new-${game.id}`} className="h-[400px]">
                  <GameCard game={game} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
