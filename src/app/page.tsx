"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaPlay, FaInfoCircle, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { getMockMovies, MockMovie, getGenreName } from "@/utils/mockData";

export default function Home() {
  const [featuredMovies, setFeaturedMovies] = useState<MockMovie[]>([]);
  const [popularMovies, setPopularMovies] = useState<MockMovie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get mock movie data
    const movies = getMockMovies();
    setFeaturedMovies(movies.slice(0, 6));
    setPopularMovies(movies.slice(6, 12));
    setIsLoading(false);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative w-full h-[70vh] mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-gray-900 to-purple-900/30">
          <div className="absolute inset-0 bg-[url('/placeholder-backdrop.jpg')] bg-cover bg-center opacity-50 mix-blend-overlay"></div>
        </div>
        <div className="relative container-custom h-full flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl sm:text-6xl font-bold mb-4 gradient-text">
              StreamLoom
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Your ultimate destination for discovering and streaming the best
              movies. Explore our vast collection of blockbusters, classics, and
              indie films.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/movies" className="btn-primary flex items-center">
                <FaPlay className="mr-2" /> Browse Movies
              </Link>
              <Link
                href="/trending"
                className="btn-secondary flex items-center"
              >
                <FaInfoCircle className="mr-2" /> Trending Now
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container-custom py-4 space-y-12">
        {/* Featured Movies Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="section-title">Featured Movies</h2>
            <Link
              href="/movies"
              className="text-blue-500 hover:text-blue-400 flex items-center gap-1"
            >
              View All <FaArrowRight className="text-sm" />
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {featuredMovies.map((movie) => (
                <Link
                  key={movie.id}
                  href={`/movie/${movie.id}`}
                  className="movie-card group"
                >
                  <div className="aspect-[2/3] relative overflow-hidden rounded-lg">
                    <Image
                      src={movie.poster_path}
                      alt={movie.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                      <div className="p-4">
                        <p className="font-medium text-white">{movie.title}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {movie.genre_ids.slice(0, 2).map((genreId) => (
                            <span
                              key={genreId}
                              className="text-xs text-gray-300"
                            >
                              {getGenreName(genreId)}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Popular Movies Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="section-title">Popular Now</h2>
            <Link
              href="/movies"
              className="text-blue-500 hover:text-blue-400 flex items-center gap-1"
            >
              View All <FaArrowRight className="text-sm" />
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {popularMovies.map((movie) => (
                <Link
                  key={movie.id}
                  href={`/movie/${movie.id}`}
                  className="movie-card group"
                >
                  <div className="aspect-[2/3] relative overflow-hidden rounded-lg">
                    <Image
                      src={movie.poster_path}
                      alt={movie.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                      <div className="p-4">
                        <p className="font-medium text-white">{movie.title}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {movie.genre_ids.slice(0, 2).map((genreId) => (
                            <span
                              key={genreId}
                              className="text-xs text-gray-300"
                            >
                              {getGenreName(genreId)}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
