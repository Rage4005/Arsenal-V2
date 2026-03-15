import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-primary/80 border-t border-white/10 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-black italic tracking-wider text-white neon-text mb-6">ARSENAL</h3>
            <p className="text-gray-400 text-sm">
              The premium destination for gamers. Discover, purchase, and play the world's best games in one immersive platform.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6">Store</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/store" className="hover:text-accent transition-colors">Browse</Link></li>
              <li><Link href="/store" className="hover:text-accent transition-colors">New Releases</Link></li>
              <li><Link href="/store" className="hover:text-accent transition-colors">Top Sellers</Link></li>
              <li><Link href="/store" className="hover:text-accent transition-colors">Special Offers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Community</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/community" className="hover:text-accent transition-colors">Forums</Link></li>
              <li><Link href="/community" className="hover:text-accent transition-colors">News</Link></li>
              <li><Link href="/community" className="hover:text-accent transition-colors">Events</Link></li>
              <li><Link href="/community" className="hover:text-accent transition-colors">Support</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Connect</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-accent transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Discord</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">YouTube</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
          <p>© 2026 Arsenal Gaming. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
