"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  FaStar,
  FaCalendar,
  FaClock,
  FaPlay,
  FaArrowLeft,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { getMovieDetails } from "@/services/movieService";
import { getImageUrl, getPlaceholder } from "@/utils/imageUtils";
import {
  formatDate,
  formatRuntime,
  formatRating,
  formatNumber,
  getYoutubeUrl,
} from "@/utils/formatters";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorFallback from "@/components/ErrorFallback";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "cast" | "similar">("overview");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Get movie details using the ID
        const movieId = Array.isArray(id)
          ? parseInt(id[0])
          : parseInt(id as string);
        const movieData = await getMovieDetails(movieId);
        setMovie(movieData);
      } catch (error) {
        console.error("Error fetching movie:", error);
        setError(error instanceof Error ? error : new Error("Failed to fetch movie details"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <LoadingSpinner size="lg" text="Loading movie details..." />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <ErrorFallback 
        error={error}
        message="Unable to load movie details. Please try again later."
        type="network"
      />
    );
  }

  const releaseYear = new Date(movie.release_date).getFullYear();

  // Prepare backdrop image with fallback
  const backdropPath = getImageUrl(movie.backdrop_path || movie.poster_path, "original") || getPlaceholder("backdrop");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
      {/* Backdrop */}
      <div className="relative w-full h-[70vh]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/70 to-gray-900"></div>
        <div className="absolute inset-0 bg-cover bg-center opacity-60" 
          style={{ backgroundImage: `url(${backdropPath})` }}>
        </div>

        {/* Back button */}
        <div className="absolute top-6 left-6 z-10">
          <Link
            href="/"
            className="flex items-center text-white bg-black/50 hover:bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full transition-all"
          >
            <FaArrowLeft className="mr-2" /> Back
          </Link>
        </div>

        {/* Movie info overlay */}
        <motion.div
          className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-gray-900 to-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="container-custom">
            <div className="flex flex-col md:flex-row gap-8 items-end">
              <div className="hidden md:block w-64 h-96 relative rounded-lg overflow-hidden shadow-2xl transform -translate-y-12">
                <Image
                  src={getImageUrl(movie.poster_path, "w500")}
                  alt={movie.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 256px"
                  priority
                  unoptimized={false}
                />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-md font-medium">
                    {releaseYear}
                  </span>
                  {movie.runtime > 0 && (
                    <span className="bg-gray-800 text-gray-200 text-xs px-2 py-1 rounded-md font-medium flex items-center">
                      <FaClock className="mr-1" />{" "}
                      {formatRuntime(movie.runtime)}
                    </span>
                  )}
                  <span className="bg-yellow-600 text-white text-xs px-2 py-1 rounded-md font-medium flex items-center">
                    <FaStar className="mr-1" /> {movie.vote_average?.toFixed(1) || "N/A"}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white">
                  {movie.title}
                </h1>
                {movie.tagline && (
                  <p className="text-xl text-gray-300 mb-4 italic">
                    {movie.tagline}
                  </p>
                )}
                <div className="flex flex-wrap gap-2 mb-4">
                  {movie.genres?.map((genre: any) => (
                    <span
                      key={genre.id}
                      className="text-sm text-white bg-gray-800/80 px-3 py-1 rounded-full"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  {movie.videos?.results?.length > 0 && (
                    <a
                      href={getYoutubeUrl(movie.videos.results[0].key)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary flex items-center"
                    >
                      <FaPlay className="mr-2" /> Watch Trailer
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main content */}
      <div className="container-custom py-8">
        {/* Tabs */}
        <div className="flex border-b border-gray-800 mb-8">
          <button
            className={`py-3 px-6 font-medium text-lg border-b-2 transition-colors ${
              activeTab === "overview"
                ? "border-blue-500 text-white"
                : "border-transparent text-gray-400 hover:text-gray-200"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`py-3 px-6 font-medium text-lg border-b-2 transition-colors ${
              activeTab === "cast"
                ? "border-blue-500 text-white"
                : "border-transparent text-gray-400 hover:text-gray-200"
            }`}
            onClick={() => setActiveTab("cast")}
          >
            Cast
          </button>
          <button
            className={`py-3 px-6 font-medium text-lg border-b-2 transition-colors ${
              activeTab === "similar"
                ? "border-blue-500 text-white"
                : "border-transparent text-gray-400 hover:text-gray-200"
            }`}
            onClick={() => setActiveTab("similar")}
          >
            Similar
          </button>
        </div>

        {/* Tab content */}
        <div className="mb-16">
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    {movie.overview || "No overview available for this movie."}
                  </p>

                  {/* Director & Writer info (if available) */}
                  {movie.credits?.crew && (
                    <div className="mt-8">
                      <h3 className="text-xl font-bold mb-4">Credits</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {movie.credits.crew
                          .filter(
                            (person: any) =>
                              person.job === "Director" ||
                              person.department === "Writing"
                          )
                          .slice(0, 4)
                          .map((person: any) => (
                            <div
                              key={`${person.id}-${person.job}`}
                              className="flex items-start"
                            >
                              <div className="mr-4">
                                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-xl font-bold">
                                  {person.name.charAt(0)}
                                </div>
                              </div>
                              <div>
                                <p className="font-medium">{person.name}</p>
                                <p className="text-sm text-gray-400">
                                  {person.job}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <div className="glass p-6 rounded-xl">
                    <h3 className="text-xl font-bold mb-4">Movie Info</h3>
                    <ul className="space-y-4">
                      <li className="flex justify-between">
                        <span className="text-gray-400">Status</span>
                        <span className="font-medium">{movie.status || "Unknown"}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-400">Release Date</span>
                        <span className="font-medium">
                          {movie.release_date ? new Date(movie.release_date).toLocaleDateString() : "Unknown"}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-400">Runtime</span>
                        <span className="font-medium">
                          {formatRuntime(movie.runtime)}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-400">Vote Average</span>
                        <span className="font-medium flex items-center">
                          <FaStar className="text-yellow-500 mr-1" />
                          {movie.vote_average?.toFixed(1) || "N/A"}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-400">Vote Count</span>
                        <span className="font-medium">
                          {movie.vote_count?.toLocaleString() || "0"}
                        </span>
                      </li>
                      {movie.budget > 0 && (
                        <li className="flex justify-between">
                          <span className="text-gray-400">Budget</span>
                          <span className="font-medium">
                            ${movie.budget.toLocaleString()}
                          </span>
                        </li>
                      )}
                      {movie.revenue > 0 && (
                        <li className="flex justify-between">
                          <span className="text-gray-400">Revenue</span>
                          <span className="font-medium">
                            ${movie.revenue.toLocaleString()}
                          </span>
                        </li>
                      )}
                    </ul>

                    {/* Production companies */}
                    {movie.production_companies &&
                      movie.production_companies.length > 0 && (
                        <div className="mt-6">
                          <h4 className="text-lg font-bold mb-3">Production</h4>
                          <div className="flex flex-wrap gap-4">
                            {movie.production_companies.map((company: any) => (
                              <div
                                key={company.id}
                                className="flex items-center bg-gray-800/50 px-3 py-1 rounded-lg"
                              >
                                {company.name}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "cast" && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
            >
              {movie.credits?.cast?.length > 0 ? (
                movie.credits.cast.slice(0, 18).map((person: any) => (
                  <motion.div
                    key={person.id}
                    variants={itemVariants}
                    className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-lg overflow-hidden hover-card"
                  >
                    <div className="aspect-[2/3] relative">
                      {person.profile_path ? (
                        <Image
                          src={getImageUrl(person.profile_path, "w500")}
                          alt={person.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 150px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-700">
                          <div className="text-4xl font-bold text-gray-500">
                            {person.name.charAt(0)}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="font-medium text-sm truncate">
                        {person.name}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {person.character}
                      </p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <p className="text-gray-400">No cast information available.</p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "similar" && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
            >
              {movie.similar?.results?.length > 0 ? (
                movie.similar.results.slice(0, 12).map((similarMovie: any) => (
                  <motion.div key={similarMovie.id} variants={itemVariants}>
                    <Link
                      href={`/movie/${similarMovie.id}`}
                      className="movie-card group"
                    >
                      <div className="aspect-[2/3] relative overflow-hidden rounded-lg">
                        <Image
                          src={getImageUrl(similarMovie.poster_path, "w500")}
                          alt={similarMovie.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-110"
                          sizes="(max-width: 768px) 50vw, 150px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                          <div className="p-4">
                            <p className="font-medium text-white">
                              {similarMovie.title}
                            </p>
                            <div className="flex items-center mt-1">
                              <FaStar className="text-yellow-500 mr-1 text-xs" />
                              <span className="text-xs text-gray-300">
                                {similarMovie.vote_average?.toFixed(1) || "N/A"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <p className="text-gray-400">No similar movies found.</p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
