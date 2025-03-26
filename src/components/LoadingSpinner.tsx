"use client";

import { motion } from "framer-motion";
import { loader } from "@/utils/animations";

type LoadingSize = "sm" | "md" | "lg" | "xl";
type LoadingType = "spinner" | "dots" | "pulse";
type LoadingColor = "blue" | "white" | "gray";

interface LoadingSpinnerProps {
  size?: LoadingSize;
  type?: LoadingType;
  color?: LoadingColor;
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

export default function LoadingSpinner({
  size = "md",
  type = "spinner",
  color = "blue",
  text,
  fullScreen = false,
  className = "",
}: LoadingSpinnerProps) {
  // Size mapping
  const sizeMap = {
    sm: {
      spinner: "w-6 h-6 border-2",
      container: "text-sm",
    },
    md: {
      spinner: "w-10 h-10 border-3",
      container: "text-base",
    },
    lg: {
      spinner: "w-16 h-16 border-4",
      container: "text-lg",
    },
    xl: {
      spinner: "w-24 h-24 border-6",
      container: "text-xl",
    },
  };

  // Color mapping
  const colorMap = {
    blue: {
      spinner: "border-blue-500",
      transparent: "border-t-transparent",
      dots: "bg-blue-500",
      text: "text-blue-500",
    },
    white: {
      spinner: "border-white",
      transparent: "border-t-transparent",
      dots: "bg-white",
      text: "text-white",
    },
    gray: {
      spinner: "border-gray-300",
      transparent: "border-t-transparent",
      dots: "bg-gray-300",
      text: "text-gray-300",
    },
  };

  // Container classes
  const containerClasses = `flex flex-col items-center justify-center gap-4 ${
    fullScreen ? "fixed inset-0 z-50 bg-gray-900/80 backdrop-blur-sm" : ""
  } ${sizeMap[size].container} ${className}`;

  // Render spinner type
  const renderLoadingElement = () => {
    switch (type) {
      case "spinner":
        return (
          <motion.div
            variants={loader}
            animate="animate"
            className={`rounded-full border ${sizeMap[size].spinner} ${colorMap[color].spinner} ${colorMap[color].transparent}`}
          />
        );
      case "dots":
        return (
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.8, opacity: 0.4 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.2,
                }}
                className={`rounded-full ${colorMap[color].dots} ${
                  size === "sm"
                    ? "w-2 h-2"
                    : size === "md"
                    ? "w-3 h-3"
                    : size === "lg"
                    ? "w-4 h-4"
                    : "w-6 h-6"
                }`}
              />
            ))}
          </div>
        );
      case "pulse":
        return (
          <motion.div
            initial={{ scale: 0.8, opacity: 0.3 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className={`rounded-full ${colorMap[color].dots} ${
              size === "sm"
                ? "w-12 h-12"
                : size === "md"
                ? "w-16 h-16"
                : size === "lg"
                ? "w-24 h-24"
                : "w-32 h-32"
            }`}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={containerClasses}>
      {renderLoadingElement()}
      {text && <p className={`font-medium ${colorMap[color].text}`}>{text}</p>}
    </div>
  );
}
