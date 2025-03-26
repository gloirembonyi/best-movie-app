"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaHome, FaRedo } from "react-icons/fa";

interface ErrorBoundaryProps {
  error?: Error;
  resetErrorBoundary?: () => void;
  message?: string;
  type?: "network" | "not-found" | "server" | "generic";
  children?: React.ReactNode;
}

export default function ErrorBoundary({
  error,
  resetErrorBoundary,
  message,
  type = "generic",
  children,
}: ErrorBoundaryProps) {
  const [errorMessage, setErrorMessage] = useState<string>(
    message || error?.message || "Something went wrong"
  );

  useEffect(() => {
    // Log the error to console for debugging
    if (error) {
      console.error("Error caught by ErrorBoundary:", error);
    }
  }, [error]);

  // If no error, render children
  if (!error && !message) {
    return <>{children}</>;
  }

  // Error illustrations/icons based on type
  const errorIllustration = {
    network: "🌐",
    "not-found": "🔍",
    server: "🖥️",
    generic: "⚠️",
  };

  // Error titles based on type
  const errorTitle = {
    network: "Network Error",
    "not-found": "Not Found",
    server: "Server Error",
    generic: "Something Went Wrong",
  };

  return (
    <div className="min-h-[500px] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl w-full glass p-8 rounded-xl text-center"
      >
        <div className="text-6xl mb-6">{errorIllustration[type]}</div>
        <h1 className="text-2xl md:text-3xl font-bold mb-4 gradient-text">
          {errorTitle[type]}
        </h1>
        <p className="text-gray-300 mb-8">{errorMessage}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {resetErrorBoundary && (
            <button
              onClick={resetErrorBoundary}
              className="btn-primary flex items-center justify-center"
            >
              <FaRedo className="mr-2" /> Try Again
            </button>
          )}

          <Link
            href="/"
            className="btn-secondary flex items-center justify-center"
          >
            <FaHome className="mr-2" /> Back to Home
          </Link>
        </div>

        {error && process.env.NODE_ENV === "development" && (
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
      </motion.div>
    </div>
  );
}
