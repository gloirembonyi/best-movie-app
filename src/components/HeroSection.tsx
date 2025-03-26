"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { FaPlay, FaStar, FaInfoCircle } from "react-icons/fa";
import { Movie } from "@/types/movie";
import { getImageUrl } from "@/services/movieService";
import { formatRating } from "@/utils/formatters";
import { motion } from "framer-motion";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

interface HeroSectionProps {
  movies: Movie[];
}

export default function HeroSection({ movies }: HeroSectionProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [fallbackMode, setFallbackMode] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Check if we have movies data
    if (movies && movies.length > 0) {
      setIsLoaded(true);
    } else {
      setFallbackMode(true);
    }
  }, [movies]);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: delay,
        ease: [0.645, 0.045, 0.355, 1.0],
      },
    }),
  };

  if (fallbackMode) {
    return (
      <div className="relative w-full h-[80vh] mb-10 bg-gradient-to-b from-blue-900/40 to-black flex items-center justify-center">
        <div className="text-center max-w-2xl px-4">
          <motion.h1
            className="text-5xl sm:text-6xl font-bold mb-6 gradient-text"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            StreamLoom
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Your ultimate destination for movies. Discover the latest releases,
            trending titles, and timeless classics.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              href="/movies"
              className="btn-primary inline-flex items-center mx-2"
            >
              <FaPlay className="mr-2" /> Explore Movies
            </Link>
            <Link
              href="/trending"
              className="btn-secondary inline-flex items-center mx-2"
            >
              <FaInfoCircle className="mr-2" /> Trending Now
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <section className="relative w-full h-[80vh] mb-10">
      {isLoaded && (
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          effect="fade"
          slidesPerView={1}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            renderBullet: function (index, className) {
              return '<span class="' + className + ' w-3 h-3"></span>';
            },
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          loop={true}
          className="w-full h-full"
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
          {movies.slice(0, 5).map((movie, index) => (
            <SwiperSlide key={movie.id}>
              <div className="relative w-full h-full overflow-hidden">
                {/* Backdrop Image */}
                <div className="absolute inset-0">
                  <Image
                    src={
                      getImageUrl(movie.backdrop_path, "original") ||
                      "/placeholder-backdrop.svg"
                    }
                    alt={movie.title}
                    fill
                    priority
                    className="object-cover"
                  />
                  {/* Gradient Overlay with animated pattern */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent">
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.2) 0%, transparent 50%), 
                                        radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`,
                      }}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="relative h-full container-custom flex flex-col justify-end pb-20 z-10">
                  <div className="max-w-2xl">
                    <motion.h1
                      custom={0.1}
                      variants={fadeIn}
                      initial="hidden"
                      animate={activeIndex === index ? "visible" : "hidden"}
                      className="text-4xl md:text-5xl font-bold mb-3"
                    >
                      {movie.title}
                    </motion.h1>

                    <motion.div
                      custom={0.2}
                      variants={fadeIn}
                      initial="hidden"
                      animate={activeIndex === index ? "visible" : "hidden"}
                      className="flex items-center mb-4 text-sm"
                    >
                      <span className="flex items-center mr-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                        <FaStar className="text-yellow-500 mr-1" />
                        {formatRating(movie.vote_average)}
                      </span>
                      <span className="mr-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                        {new Date(movie.release_date).getFullYear()}
                      </span>
                    </motion.div>

                    <motion.p
                      custom={0.3}
                      variants={fadeIn}
                      initial="hidden"
                      animate={activeIndex === index ? "visible" : "hidden"}
                      className="text-gray-300 mb-6 line-clamp-3 backdrop-blur-sm bg-black/30 p-3 rounded-lg"
                    >
                      {movie.overview}
                    </motion.p>

                    <motion.div
                      custom={0.4}
                      variants={fadeIn}
                      initial="hidden"
                      animate={activeIndex === index ? "visible" : "hidden"}
                      className="flex flex-wrap gap-3"
                    >
                      <Link
                        href={`/movie/${movie.id}`}
                        className="btn-primary flex items-center group"
                      >
                        <FaPlay className="mr-2 group-hover:animate-pulse" />{" "}
                        Watch Now
                      </Link>
                      <Link
                        href={`/movie/${movie.id}`}
                        className="btn-secondary flex items-center"
                      >
                        <FaInfoCircle className="mr-2" /> More Info
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* Custom navigation arrows */}
          <div className="swiper-button-prev !text-white !opacity-70 hover:!opacity-100"></div>
          <div className="swiper-button-next !text-white !opacity-70 hover:!opacity-100"></div>
        </Swiper>
      )}
    </section>
  );
}
