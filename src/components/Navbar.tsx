"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaSearch, FaBars, FaTimes, FaHome, FaFire, FaStar, FaFilm } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would redirect to search results
    console.log(`Searching for: ${searchQuery}`);
    setSearchQuery("");
    setIsMenuOpen(false);
  };
  
  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled || isMenuOpen ? "bg-black/90 backdrop-blur-md" : "bg-gradient-to-b from-black/80 to-transparent"
    }`}>
      <div className="container-custom flex justify-between items-center py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <motion.h1 
            className="text-2xl md:text-3xl font-bold gradient-text"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            StreamLoom
          </motion.h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            href="/" 
            className={`flex items-center hover:text-blue-400 transition-colors ${isActive('/') ? 'text-blue-400' : 'text-gray-200'}`}
          >
            <FaHome className="mr-1" /> Home
          </Link>
          <Link 
            href="/movies" 
            className={`flex items-center hover:text-blue-400 transition-colors ${isActive('/movies') ? 'text-blue-400' : 'text-gray-200'}`}
          >
            <FaFilm className="mr-1" /> Movies
          </Link>
          <Link 
            href="/trending" 
            className={`flex items-center hover:text-blue-400 transition-colors ${isActive('/trending') ? 'text-blue-400' : 'text-gray-200'}`}
          >
            <FaFire className="mr-1" /> Trending
          </Link>
          <Link 
            href="/top-rated" 
            className={`flex items-center hover:text-blue-400 transition-colors ${isActive('/top-rated') ? 'text-blue-400' : 'text-gray-200'}`}
          >
            <FaStar className="mr-1" /> Top Rated
          </Link>
        </nav>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-900/80 text-white px-4 py-2 rounded-full w-48 focus:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <button
            type="submit"
            className="absolute right-3 text-gray-400 hover:text-white"
            aria-label="Search"
          >
            <FaSearch />
          </button>
        </form>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden bg-black/95 py-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
        >
          <div className="container-custom flex flex-col space-y-4">
            <form
              onSubmit={handleSearch}
              className="flex items-center relative mb-4"
            >
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-900 text-white px-4 py-2 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="absolute right-3 text-gray-400 hover:text-white"
                aria-label="Search"
              >
                <FaSearch />
              </button>
            </form>

            <div className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className={`flex items-center text-lg ${isActive('/') ? 'text-blue-400 font-medium' : 'text-gray-200'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <FaHome className="mr-2" /> Home
              </Link>
              <Link 
                href="/movies" 
                className={`flex items-center text-lg ${isActive('/movies') ? 'text-blue-400 font-medium' : 'text-gray-200'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <FaFilm className="mr-2" /> Movies
              </Link>
              <Link 
                href="/trending" 
                className={`flex items-center text-lg ${isActive('/trending') ? 'text-blue-400 font-medium' : 'text-gray-200'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <FaFire className="mr-2" /> Trending
              </Link>
              <Link 
                href="/top-rated" 
                className={`flex items-center text-lg ${isActive('/top-rated') ? 'text-blue-400 font-medium' : 'text-gray-200'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <FaStar className="mr-2" /> Top Rated
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
