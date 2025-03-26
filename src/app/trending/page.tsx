"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaStar,
  FaSearch,
  FaTimes,
  FaFilter,
  FaSort,
  FaSortAmountDown,
  FaSortAmountUp,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import mockMovieResponses from "@/utils/mockData";
import { formatReleaseYear } from "@/utils/formatters";
import { Movie } from "@/types/movie";

type SortOption = "popularity" | "vote_average" | "release_date" | "title";
type SortDirection = "asc" | "desc";

export default function TrendingPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("popularity");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [minRating, setMinRating] = useState(0);

  // Define genres
  const genres = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 18, name: "Drama" },
    { id: 14, name: "Fantasy" },
    { id: 27, name: "Horror" },
    { id: 878, name: "Sci-Fi" },
    { id: 53, name: "Thriller" },
  ];

  useEffect(() => {
    // Fetch trending movies
    const fetchMovies = async () => {
      try {
        // Use our mock data
        const response = mockMovieResponses.trending;
        setMovies(response.results);
        setFilteredMovies(response.results);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      } finally {
        // Add a slight delay to simulate loading
        setTimeout(() => setIsLoading(false), 800);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    // Filter and sort movies when filters or search change
    let result = [...movies];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (movie) =>
          movie.title.toLowerCase().includes(query) ||
          movie.overview.toLowerCase().includes(query)
      );
    }

    // Apply genre filter
    if (selectedGenres.length > 0) {
      result = result.filter((movie) =>
        movie.genre_ids.some((id) => selectedGenres.includes(id))
      );
    }

    // Apply rating filter
    if (minRating > 0) {
      result = result.filter((movie) => movie.vote_average >= minRating);
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "popularity":
          comparison = a.popularity - b.popularity;
          break;
        case "vote_average":
          comparison = a.vote_average - b.vote_average;
          break;
        case "release_date":
          comparison =
            new Date(a.release_date).getTime() -
            new Date(b.release_date).getTime();
          break;
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
      }

      return sortDirection === "desc" ? -comparison : comparison;
    });

    setFilteredMovies(result);
  }, [movies, searchQuery, selectedGenres, minRating, sortBy, sortDirection]);

  const handleGenreToggle = (genreId: number) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
  };

  const handleSortChange = (option: SortOption) => {
    if (sortBy === option) {
      // Toggle direction if same option
      setSortDirection(sortDirection === "desc" ? "asc" : "desc");
    } else {
      // Set new option with default desc direction
      setSortBy(option);
      setSortDirection("desc");
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedGenres([]);
    setMinRating(0);
    setSortBy("popularity");
    setSortDirection("desc");
  };

  const hasActiveFilters =
    searchQuery || selectedGenres.length > 0 || minRating > 0;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <div className="relative w-full bg-gradient-to-r from-blue-900 to-purple-900 py-16">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative container-custom">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 gradient-text">
              Trending Movies
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mb-8">
              Discover the most popular movies trending right now. Updated daily
              with the latest hits.
            </p>
          </motion.div>

          {/* Search and filter */}
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search trending movies..."
                  className="w-full px-4 py-3 pl-10 bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-4 py-3 rounded-lg flex items-center gap-2 ${
                    showFilters
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-200 hover:bg-gray-700"
                  }`}
                >
                  <FaFilter /> Filters
                  {selectedGenres.length > 0 && (
                    <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {selectedGenres.length}
                    </span>
                  )}
                </button>
                <div className="relative group">
                  <button className="px-4 py-3 rounded-lg bg-gray-800 text-gray-200 hover:bg-gray-700 flex items-center gap-2">
                    <FaSort /> Sort
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden hidden group-hover:block z-20">
                    <div className="p-2 space-y-1">
                      <button
                        onClick={() => handleSortChange("popularity")}
                        className={`w-full text-left px-3 py-2 rounded flex items-center justify-between ${
                          sortBy === "popularity"
                            ? "bg-blue-600/30 text-blue-400"
                            : "hover:bg-gray-700"
                        }`}
                      >
                        <span>Popularity</span>
                        {sortBy === "popularity" &&
                          (sortDirection === "desc" ? (
                            <FaSortAmountDown />
                          ) : (
                            <FaSortAmountUp />
                          ))}
                      </button>
                      <button
                        onClick={() => handleSortChange("vote_average")}
                        className={`w-full text-left px-3 py-2 rounded flex items-center justify-between ${
                          sortBy === "vote_average"
                            ? "bg-blue-600/30 text-blue-400"
                            : "hover:bg-gray-700"
                        }`}
                      >
                        <span>Rating</span>
                        {sortBy === "vote_average" &&
                          (sortDirection === "desc" ? (
                            <FaSortAmountDown />
                          ) : (
                            <FaSortAmountUp />
                          ))}
                      </button>
                      <button
                        onClick={() => handleSortChange("release_date")}
                        className={`w-full text-left px-3 py-2 rounded flex items-center justify-between ${
                          sortBy === "release_date"
                            ? "bg-blue-600/30 text-blue-400"
                            : "hover:bg-gray-700"
                        }`}
                      >
                        <span>Release Date</span>
                        {sortBy === "release_date" &&
                          (sortDirection === "desc" ? (
                            <FaSortAmountDown />
                          ) : (
                            <FaSortAmountUp />
                          ))}
                      </button>
                      <button
                        onClick={() => handleSortChange("title")}
                        className={`w-full text-left px-3 py-2 rounded flex items-center justify-between ${
                          sortBy === "title"
                            ? "bg-blue-600/30 text-blue-400"
                            : "hover:bg-gray-700"
                        }`}
                      >
                        <span>Title</span>
                        {sortBy === "title" &&
                          (sortDirection === "desc" ? (
                            <FaSortAmountDown />
                          ) : (
                            <FaSortAmountUp />
                          ))}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters panel */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 p-6 bg-gray-900/90 backdrop-blur-md border border-gray-800 rounded-lg overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Genre filter */}
                    <div className="flex-1">
                      <h3 className="text-lg font-medium mb-3">Genres</h3>
                      <div className="flex flex-wrap gap-2">
                        {genres.map((genre) => (
                          <button
                            key={genre.id}
                            onClick={() => handleGenreToggle(genre.id)}
                            className={`px-3 py-1 text-sm rounded-full transition-colors ${
                              selectedGenres.includes(genre.id)
                                ? "bg-blue-600 text-white"
                                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                            }`}
                          >
                            {genre.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Rating filter */}
                    <div className="md:w-1/3">
                      <h3 className="text-lg font-medium mb-3">
                        Minimum Rating: {minRating}+
                      </h3>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        step="0.5"
                        value={minRating}
                        onChange={(e) =>
                          setMinRating(parseFloat(e.target.value))
                        }
                        className="w-full accent-blue-500"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>Any</span>
                        <span>5</span>
                        <span>10</span>
                      </div>
                    </div>
                  </div>

                  {/* Filter actions */}
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={clearFilters}
                      className="px-4 py-2 text-gray-300 hover:text-white flex items-center gap-1"
                      disabled={!hasActiveFilters}
                    >
                      <FaTimes size={14} />
                      Clear Filters
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Movies grid */}
      <div className="container-custom py-12">
        {/* Results summary */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">
              {hasActiveFilters
                ? `${filteredMovies.length} Results Found`
                : "All Trending Movies"}
            </h2>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-sm"
              >
                <FaTimes size={14} /> Clear All Filters
              </button>
            )}
          </div>
        </div>

        {isLoading ? (
          // Skeleton loading
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="movie-card shimmer">
                <div className="aspect-[2/3] rounded-lg bg-gray-800"></div>
                <div className="mt-2">
                  <div className="h-5 bg-gray-800 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-800 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredMovies.length === 0 ? (
          // No results
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-6xl text-gray-700 mb-4">🔍</div>
            <h3 className="text-2xl font-medium mb-2">No Movies Found</h3>
            <p className="text-gray-400 mb-6 text-center max-w-md">
              We couldn't find any movies matching your search criteria. Try
              adjusting your filters.
            </p>
            <button onClick={clearFilters} className="btn-primary">
              Clear All Filters
            </button>
          </div>
        ) : (
          // Movies grid
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          >
            {filteredMovies.map((movie) => (
              <motion.div key={movie.id} variants={itemVariants}>
                <Link
                  href={`/movie/${movie.id}`}
                  className="block group hover-card"
                >
                  <div className="movie-card">
                    <div className="aspect-[2/3] relative overflow-hidden rounded-lg">
                      <Image
                        src={movie.poster_path || "/placeholder-movie-1.jpg"}
                        alt={movie.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                        <p className="font-medium text-white line-clamp-2">
                          {movie.title}
                        </p>
                        <p className="text-sm text-gray-300 mt-1">
                          {formatReleaseYear(movie.release_date)}
                        </p>
                      </div>
                      {/* Rating badge */}
                      <div className="absolute top-2 right-2 bg-black/70 rounded-full px-2 py-1 text-sm flex items-center">
                        <FaStar className="text-yellow-500 mr-1" />
                        <span>{movie.vote_average.toFixed(1)}</span>
                      </div>
                    </div>
                    <div className="mt-2 px-1">
                      <h3 className="font-medium line-clamp-1 group-hover:text-blue-400 transition-colors">
                        {movie.title}
                      </h3>
                      <div className="flex items-center mt-1">
                        <span className="text-sm text-gray-400">
                          {formatReleaseYear(movie.release_date)}
                        </span>
                        <span className="mx-2 text-gray-600">•</span>
                        <div className="flex items-center text-sm">
                          <FaStar className="text-yellow-500 mr-1 text-xs" />
                          <span className="text-gray-300">
                            {movie.vote_average.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
