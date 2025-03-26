"use client";

import {
  FaExclamationTriangle,
  FaRedoAlt,
  FaFilm,
  FaHome,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

interface ErrorFallbackProps {
  title?: string;
  message?: string;
}

export default function ErrorFallback({
  title = "Could Not Load Data",
  message = "There was an error connecting to the movie database. This could be due to network issues or the API being temporarily unavailable.",
}: ErrorFallbackProps) {
  const router = useRouter();

  const handleRetry = () => {
    router.refresh();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <div className="glass p-8 rounded-xl max-w-2xl">
        <motion.div
          initial={{ scale: 0.8, rotate: 0 }}
          animate={{ scale: 1, rotate: [0, -10, 10, -5, 5, 0] }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-24 h-24 mx-auto mb-6 rounded-full bg-yellow-500/20 flex items-center justify-center"
        >
          <FaExclamationTriangle className="text-yellow-500 text-5xl" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="text-2xl md:text-3xl font-bold mb-4 gradient-text"
        >
          {title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="text-gray-300 mb-8"
        >
          {message}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <button
            onClick={handleRetry}
            className="btn-primary flex items-center"
          >
            <FaRedoAlt className="mr-2" /> Try Again
          </button>

          <Link href="/" className="btn-secondary flex items-center">
            <FaHome className="mr-2" /> Go Home
          </Link>

          <Link href="/movies" className="btn-secondary flex items-center">
            <FaFilm className="mr-2" /> Browse Movies
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
