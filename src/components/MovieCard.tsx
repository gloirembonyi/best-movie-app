"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaStar, FaPlayCircle } from "react-icons/fa";
import { Movie } from "@/types/movie";
import { getImageUrl, handleImageError } from "@/utils/imageUtils";
import { formatDate, formatRating } from "@/utils/formatters";
import { motion } from "framer-motion";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const posterUrl = getImageUrl(movie.poster_path, "w500");

  // If there was an error loading the image, use a placeholder
  const imageSrc = imageError
    ? `/placeholder-movie-${(movie.id % 5) + 1}.jpg`
    : posterUrl;

  // Handle image loading errors
  const onImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setImageError(true);
    handleImageError(e, "poster");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="hover-card group relative overflow-hidden rounded-lg bg-gray-900 shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/movie/${movie.id}`} className="block">
        <div className="aspect-[2/3] relative">
          <div
            className={`relative h-full w-full ${
              isLoading ? "shimmer bg-gray-800" : ""
            }`}
          >
            <Image
              src={imageSrc}
              alt={movie.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
              onLoadingComplete={() => setIsLoading(false)}
              onError={onImageError}
              priority={false}
              loading="lazy"
            />
          </div>

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Rating badge */}
          <div className="absolute top-2 right-2 flex items-center bg-black/80 backdrop-blur-sm rounded-full px-2 py-1 text-sm shadow-md">
            <FaStar className="text-yellow-500 mr-1" />
            <span>{formatRating(movie.vote_average)}</span>
          </div>

          {/* Play button on hover */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <FaPlayCircle className="text-5xl text-white/90 drop-shadow-md hover:text-blue-500" />
          </motion.div>

          {/* Movie info on hover */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            className="absolute bottom-0 left-0 right-0 p-4 text-white"
          >
            <h3 className="font-bold text-lg line-clamp-1 drop-shadow-md">
              {movie.title}
            </h3>
            <p className="text-gray-300 text-sm drop-shadow-md">
              {formatDate(movie.release_date)}
            </p>
          </motion.div>
        </div>

        {/* Movie info (shown when not hovered) */}
        <div className="p-3 group-hover:opacity-0 transition-opacity">
          <h3 className="font-semibold text-lg line-clamp-1">{movie.title}</h3>
          <p className="text-gray-400 text-sm">
            {formatDate(movie.release_date)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
