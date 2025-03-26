"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaHome, FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <div className="text-9xl font-bold gradient-text mb-6">404</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Page Not Found
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            The page you're looking for doesn't exist or has been moved to
            another location.
          </p>

          <div className="bg-black/30 backdrop-blur-sm p-6 rounded-2xl mb-8 max-w-lg mx-auto">
            <form onSubmit={handleSearch} className="relative mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Try searching for something else..."
                className="w-full px-4 py-3 pl-10 bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-400"
                aria-label="Search"
              >
                Search
              </button>
            </form>

            <div className="text-gray-400 text-sm">
              Popular searches: Action, Comedy, Sci-Fi, Drama
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="btn-primary flex items-center justify-center"
            >
              <FaHome className="mr-2" /> Return Home
            </Link>
            <Link
              href="/trending"
              className="btn-secondary flex items-center justify-center"
            >
              Explore Trending Movies
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
