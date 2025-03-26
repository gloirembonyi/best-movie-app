"use client";

import { FaFilm } from "react-icons/fa";
import { motion } from "framer-motion";

type SpinnerSize = "small" | "medium" | "large";

interface LoadingSpinnerProps {
  size?: SpinnerSize;
  text?: string;
  fullScreen?: boolean;
}

const getSizeClass = (size: SpinnerSize): string => {
  switch (size) {
    case "small":
      return "text-xl";
    case "medium":
      return "text-3xl";
    case "large":
      return "text-5xl";
    default:
      return "text-3xl";
  }
};

export default function LoadingSpinner({
  size = "medium",
  text = "Loading...",
  fullScreen = false,
}: LoadingSpinnerProps) {
  const sizeClass = getSizeClass(size);

  const spinner = (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
        className={`${sizeClass} text-blue-500 mb-3`}
      >
        <FaFilm />
      </motion.div>
      {text && <p className="text-gray-300 animate-pulse">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return (
    <div className="w-full py-10 flex items-center justify-center">
      {spinner}
    </div>
  );
}
