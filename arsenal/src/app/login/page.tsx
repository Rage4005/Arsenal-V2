"use client";

import Link from "next/link";
import { Mail, Lock, ArrowRight, Chrome } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { signInWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/profile");
    } catch (err: any) {
      setError("Failed to sign in. Please check your credentials.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/cod_cover.png" 
          alt="Login Background" 
          className="w-full h-full object-cover filter brightness-[0.25] hue-rotate-15 blur-[2px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="inline-block text-4xl font-black italic tracking-wider text-white neon-text glow-accent mb-2">
            ARSENAL
          </Link>
          <p className="text-gray-400">Welcome back, Commander.</p>
        </div>

        <div className="glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Decorative neon accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent"></div>

          <h2 className="text-2xl font-bold text-white mb-6">Sign In</h2>
          
          {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

          <div className="space-y-6">
            <button 
              onClick={() => signInWithGoogle()}
              className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 font-bold py-3 px-4 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <Chrome className="h-5 w-5 text-gray-600" />
              Continue with Google
            </button>

            <div className="relative flex items-center">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="flex-shrink-0 mx-4 text-gray-500 text-sm">or sign in with email</span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>

            <form onSubmit={handleEmailSignIn} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl leading-5 bg-white/5 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent sm:text-sm transition-colors glass"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-gray-300">Password</label>
                  <a href="#" className="text-sm font-medium text-accent hover:text-[#00e35a]">Forgot password?</a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl leading-5 bg-white/5 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent sm:text-sm transition-colors glass"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-primary bg-accent hover:bg-[#00e35a] focus:outline-none transition-colors disabled:opacity-50"
                >
                  {loading ? 'Signing in...' : 'Sign In'} <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>

          <div className="mt-8 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link href="/signup" className="font-bold text-white hover:text-accent transition-colors">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
