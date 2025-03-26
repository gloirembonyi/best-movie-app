"use client";

import MovieCard from "@/components/MovieCard";
import { Movie } from "@/types/movie";
import { motion } from "framer-motion";

interface MovieGridProps {
  movies: Movie[];
  loading?: boolean;
}

export default function MovieGrid({ movies, loading = false }: MovieGridProps) {
  if (loading) {
    return (
      <div className="movie-grid">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse bg-gray-800 rounded-lg aspect-[2/3]"
          />
        ))}
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-400 text-lg">No movies found</p>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      className="movie-grid"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </motion.div>
  );
}
