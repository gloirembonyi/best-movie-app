"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="bg-gray-900 py-4 sticky top-0 z-50 shadow-md backdrop-blur-sm bg-opacity-90">
      <div className="container-custom flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl md:text-2xl font-bold gradient-text">
          StreamLoom
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link
            href="/"
            className={`hover:text-blue-400 transition-colors ${
              isActive("/") ? "text-blue-400" : ""
            }`}
          >
            Home
          </Link>
          <Link
            href="/movies"
            className={`hover:text-blue-400 transition-colors ${
              isActive("/movies") ? "text-blue-400" : ""
            }`}
          >
            Popular
          </Link>
          <Link
            href="/trending"
            className={`hover:text-blue-400 transition-colors ${
              isActive("/trending") ? "text-blue-400" : ""
            }`}
          >
            Trending
          </Link>
          <Link
            href="/top-rated"
            className={`hover:text-blue-400 transition-colors ${
              isActive("/top-rated") ? "text-blue-400" : ""
            }`}
          >
            Top Rated
          </Link>
          <Link
            href="/search"
            className="flex items-center hover:text-blue-400 transition-colors"
          >
            <FaSearch className="mr-1" /> Search
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-gray-800 py-4 px-6 mt-1 absolute w-full shadow-lg">
          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              className={`hover:text-blue-400 transition-colors ${
                isActive("/") ? "text-blue-400" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/movies"
              className={`hover:text-blue-400 transition-colors ${
                isActive("/movies") ? "text-blue-400" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Popular
            </Link>
            <Link
              href="/trending"
              className={`hover:text-blue-400 transition-colors ${
                isActive("/trending") ? "text-blue-400" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Trending
            </Link>
            <Link
              href="/top-rated"
              className={`hover:text-blue-400 transition-colors ${
                isActive("/top-rated") ? "text-blue-400" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Top Rated
            </Link>
            <Link
              href="/search"
              className="flex items-center hover:text-blue-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaSearch className="mr-1" /> Search
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
