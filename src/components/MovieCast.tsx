"use client";

import Image from "next/image";
import { Cast } from "@/types/movie";
import { getImageUrl } from "@/services/movieService";
import { motion } from "framer-motion";

interface MovieCastProps {
  cast: Cast[];
}

export default function MovieCast({ cast }: MovieCastProps) {
  if (!cast || cast.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {cast.map((person) => (
        <motion.div
          key={person.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-900 rounded-lg overflow-hidden shadow-md"
        >
          <div className="aspect-[2/3] relative">
            <Image
              src={
                getImageUrl(person.profile_path, "w500") ||
                "/placeholder-person.svg"
              }
              alt={person.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-3">
            <h3 className="font-medium line-clamp-1">{person.name}</h3>
            <p className="text-gray-400 text-sm line-clamp-1">
              {person.character}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
