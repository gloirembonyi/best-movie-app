"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaPlay,
  FaInfoCircle,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { heroText } from "@/utils/animations";
import { formatRuntime } from "@/utils/formatters";
import { Movie, MockMovie } from "@/types/movie";

interface HeroSliderProps {
  movies: (Movie | MockMovie)[];
  autoplaySpeed?: number;
}

export default function HeroSlider({
  movies,
  autoplaySpeed = 6000,
}: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  // Autoplay functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isAutoplay && movies.length > 1) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
      }, autoplaySpeed);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoplay, movies.length, autoplaySpeed]);

  // Pause autoplay on hover
  const handleMouseEnter = useCallback(() => {
    setIsAutoplay(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsAutoplay(true);
  }, []);

  // Navigation controls
  const handlePrev = useCallback(() => {
    setIsAutoplay(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1
    );
  }, [movies.length]);

  const handleNext = useCallback(() => {
    setIsAutoplay(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
  }, [movies.length]);

  // Handle slide indicator click
  const goToSlide = useCallback((index: number) => {
    setIsAutoplay(false);
    setCurrentIndex(index);
  }, []);

  // Ensure we have movies to display
  if (!movies || movies.length === 0) {
    return null;
  }

  const currentMovie = movies[currentIndex];

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <div
      className="relative w-full h-[75vh] overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background and overlay */}
      <AnimatePresence initial={false} custom={1}>
        <motion.div
          key={currentIndex}
          custom={1}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0"
        >
          {/* Background image */}
          <div className="absolute inset-0 bg-[url('/placeholder-backdrop.jpg')] bg-cover bg-center opacity-70"></div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
        </motion.div>
      </AnimatePresence>

      {/* Movie content */}
      <div className="relative container-custom h-full flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            {/* Movie details */}
            <motion.div
              className="flex items-center mb-3 space-x-2"
              variants={heroText}
            >
              <span className="bg-blue-600 text-white text-xs font-medium px-2.5 py-1 rounded">
                Featured
              </span>
              {"release_date" in currentMovie && (
                <span className="text-gray-300 text-sm">
                  {new Date(currentMovie.release_date).getFullYear()}
                </span>
              )}
              {"vote_average" in currentMovie && (
                <span className="flex items-center text-sm text-yellow-500">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  {currentMovie.vote_average.toFixed(1)}
                </span>
              )}
            </motion.div>

            <motion.h1
              variants={heroText}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white"
            >
              {currentMovie.title}
            </motion.h1>

            <motion.p
              variants={heroText}
              className="text-gray-300 text-lg mb-8 line-clamp-3"
            >
              {currentMovie.overview}
            </motion.p>

            <motion.div variants={heroText} className="flex flex-wrap gap-4">
              <Link
                href={`/movie/${currentMovie.id}`}
                className="btn-primary flex items-center"
              >
                <FaPlay className="mr-2" /> Watch Trailer
              </Link>
              <Link
                href={`/movie/${currentMovie.id}`}
                className="btn-secondary flex items-center"
              >
                <FaInfoCircle className="mr-2" /> More Info
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white p-3 rounded-full transition-colors"
        aria-label="Previous movie"
      >
        <FaChevronLeft />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white p-3 rounded-full transition-colors"
        aria-label="Next movie"
      >
        <FaChevronRight />
      </button>

      {/* Slide indicators */}
      {movies.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
          {movies.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-blue-600 w-8"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
