import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
} from "@/services/movieService";
import HeroSection from "@/components/HeroSection";
import MovieGrid from "@/components/MovieGrid";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import ErrorFallback from "@/components/ErrorFallback";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to StreamLoom</h1>
      <p className="text-xl">Your movie streaming destination</p>

      <div className="bg-gray-800 p-6 rounded-lg mt-8">
        <h2 className="text-2xl font-bold mb-4">Featured Movies</h2>
        <p>The movies will be displayed here.</p>
      </div>
    </div>
  );
}
