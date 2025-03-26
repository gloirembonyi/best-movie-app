"use client";

import React from 'react';
import {
  FaExclamationTriangle,
  FaRedoAlt,
  FaFilm,
  FaHome,
  FaRedo,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export interface ErrorFallbackProps {
  error?: Error | null;
  message?: string;
  type?: "network" | "not-found" | "server" | "generic";
  resetErrorBoundary?: () => void;
}

export default function ErrorFallback({
  error,
  message = "Something went wrong",
  type = "generic",
  resetErrorBoundary,
}: ErrorFallbackProps) {
  const router = useRouter();

  const getErrorMessage = () => {
    if (message) return message;
    if (error?.message) return error.message;
    return "An unexpected error occurred";
  };

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
          {type === "network" && <FaExclamationTriangle className="text-yellow-500 text-5xl" />}
          {type === "not-found" && "🔍"}
          {type === "server" && "🖥️"}
          {type === "generic" && <FaExclamationTriangle className="text-yellow-500 text-5xl" />}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="text-2xl md:text-3xl font-bold mb-4 gradient-text"
        >
          {type === "network" && "Network Error"}
          {type === "not-found" && "Not Found"}
          {type === "server" && "Server Error"}
          {type === "generic" && "Something Went Wrong"}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="text-gray-300 mb-8"
        >
          {getErrorMessage()}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {resetErrorBoundary && (
            <button
              onClick={resetErrorBoundary}
              className="btn-primary flex items-center"
            >
              <FaRedo className="mr-2" /> Try Again
            </button>
          )}

          <Link href="/" className="btn-secondary flex items-center">
            <FaHome className="mr-2" /> Back to Home
          </Link>

          <Link href="/movies" className="btn-secondary flex items-center">
            <FaFilm className="mr-2" /> Browse Movies
          </Link>
        </motion.div>

        {process.env.NODE_ENV === "development" && error && (
          <div className="mt-8 text-left">
            <details className="bg-red-900/30 p-4 rounded-lg text-sm">
              <summary className="cursor-pointer font-medium mb-2">
                Error Details (Development Only)
              </summary>
              <pre className="overflow-x-auto p-2 bg-black/50 rounded mt-2 text-red-300">
                {error.stack || error.message}
              </pre>
            </details>
          </div>
        )}
      </div>
    </motion.div>
  );
}
