import Link from "next/link";
import { FaGithub, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 py-8 mt-16">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-xl font-bold gradient-text">
              StreamLoom
            </Link>
            <p className="text-gray-400 text-sm mt-2">
              Your movie streaming destination
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="/"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/movies"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Movies
            </Link>
            <Link
              href="/trending"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Trending
            </Link>
            <Link
              href="/search"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Search
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 pt-6 text-center text-gray-500 text-sm">
          <p>© {currentYear} StreamLoom. All rights reserved.</p>
          <p className="mt-2">
            This is a demo app for educational purposes. Not for commercial use.
          </p>
        </div>
      </div>
    </footer>
  );
}
