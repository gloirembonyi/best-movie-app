import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaStar, FaCalendar, FaClock, FaPlay } from "react-icons/fa";
import { getMovieDetails, getImageUrl } from "@/services/movieService";
import {
  formatDate,
  formatRuntime,
  formatRating,
  formatNumber,
  getYoutubeUrl,
} from "@/utils/formatters";
import MovieGrid from "@/components/MovieGrid";
import MovieCast from "@/components/MovieCast";
import VideoPlayer from "@/components/VideoPlayer";
import ErrorFallback from "@/components/ErrorFallback";

type Params = {
  id: string;
};

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  try {
    // Await params properly
    const id = params.id ? parseInt(params.id) : 0;
    const movie = await getMovieDetails(id);

    return {
      title: `${movie.title} | StreamLoom`,
      description: movie.overview.substring(0, 160),
      openGraph: {
        images:
          getImageUrl(movie.poster_path, "w500") || "/placeholder-poster.svg",
      },
    };
  } catch (error) {
    return {
      title: "Movie | StreamLoom",
      description: "View movie details on StreamLoom",
    };
  }
}

export default async function MoviePage({ params }: { params: Params }) {
  try {
    // Await params properly
    const id = params.id ? parseInt(params.id) : 0;
    const movie = await getMovieDetails(id);
    const trailers = movie.videos.results.filter(
      (video) =>
        video.site === "YouTube" &&
        (video.type === "Trailer" || video.type === "Teaser")
    );

    // Get main cast (top 6 actors)
    const mainCast = movie.credits.cast.slice(0, 6);

    // Get director and writers
    const director = movie.credits.crew.find(
      (person) => person.job === "Director"
    );
    const writers = movie.credits.crew
      .filter(
        (person) =>
          person.job === "Screenplay" ||
          person.job === "Writer" ||
          person.job === "Story"
      )
      .slice(0, 2);

    // Get similar movies
    const similarMovies = movie.similar.results.slice(0, 6);

    return (
      <>
        {/* Backdrop header */}
        <div className="relative w-full h-[60vh] md:h-[70vh]">
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
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
          </div>

          <div className="relative h-full container-custom flex flex-col justify-end pb-8 z-10">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-8 items-end">
              {/* Poster (only on desktop) */}
              <div className="hidden md:block relative aspect-[2/3] max-w-[300px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={
                    getImageUrl(movie.poster_path, "w500") ||
                    "/placeholder-poster.svg"
                  }
                  alt={movie.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Movie info */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  {movie.title}
                </h1>

                {movie.tagline && (
                  <p className="text-blue-400 mb-4 italic">{movie.tagline}</p>
                )}

                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="flex items-center bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                    <FaStar className="text-yellow-500 mr-1" />
                    {formatRating(movie.vote_average)} ({movie.vote_count}{" "}
                    votes)
                  </span>
                  <span className="flex items-center bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                    <FaCalendar className="text-gray-400 mr-1" />
                    {formatDate(movie.release_date)}
                  </span>
                  <span className="flex items-center bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                    <FaClock className="text-gray-400 mr-1" />
                    {formatRuntime(movie.runtime)}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-blue-900/60 text-sm px-3 py-1 rounded-full"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-3 mt-6">
                  {trailers.length > 0 ? (
                    <Link
                      href={`#trailer`}
                      className="btn-primary flex items-center"
                    >
                      <FaPlay className="mr-2" /> Watch Trailer
                    </Link>
                  ) : (
                    <Link
                      href="#play-movie"
                      className="btn-primary flex items-center"
                    >
                      <FaPlay className="mr-2" /> Play Movie
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="container-custom py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-8">
            <div className="space-y-8">
              {/* Movie Player (always available) */}
              <section id="play-movie">
                <h2 className="section-title">Watch Movie</h2>
                <div className="aspect-video rounded-lg overflow-hidden glass p-1">
                  <div className="relative w-full h-full">
                    {movie.video ? (
                      <VideoPlayer
                        videoKey={
                          movie.video ? "movie" : trailers[0]?.key || "movie"
                        }
                        isMainMovie={true}
                        movieId={movie.id}
                      />
                    ) : (
                      <VideoPlayer
                        videoKey="movie"
                        isMainMovie={true}
                        movieId={movie.id}
                      />
                    )}
                  </div>
                </div>
              </section>

              {/* Overview */}
              <section>
                <h2 className="section-title">Overview</h2>
                <p className="text-gray-300 glass p-4 rounded-lg">
                  {movie.overview}
                </p>
              </section>

              {/* Trailer */}
              {trailers.length > 0 && (
                <section id="trailer">
                  <h2 className="section-title">Trailer</h2>
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <VideoPlayer
                      videoKey={trailers[0].key}
                      isMainMovie={false}
                    />
                  </div>
                </section>
              )}

              {/* Cast */}
              {mainCast.length > 0 && (
                <section>
                  <h2 className="section-title">Cast</h2>
                  <MovieCast cast={mainCast} />
                </section>
              )}

              {/* Similar Movies */}
              {similarMovies.length > 0 && (
                <section>
                  <h2 className="section-title">Similar Movies</h2>
                  <MovieGrid movies={similarMovies} />
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Movie poster on mobile */}
              <div className="md:hidden relative aspect-[2/3] max-w-[300px] mx-auto rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={
                    getImageUrl(movie.poster_path, "w500") ||
                    "/placeholder-poster.svg"
                  }
                  alt={movie.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Movie info */}
              <div className="glass p-5">
                <h3 className="font-bold text-lg mb-4 gradient-text">
                  Movie Info
                </h3>

                <div className="space-y-3">
                  {director && (
                    <div>
                      <span className="text-gray-400 block">Director</span>
                      <span>{director.name}</span>
                    </div>
                  )}

                  {writers.length > 0 && (
                    <div>
                      <span className="text-gray-400 block">
                        Writer{writers.length > 1 ? "s" : ""}
                      </span>
                      <span>
                        {writers.map((writer) => writer.name).join(", ")}
                      </span>
                    </div>
                  )}

                  <div>
                    <span className="text-gray-400 block">Status</span>
                    <span>{movie.status}</span>
                  </div>

                  <div>
                    <span className="text-gray-400 block">
                      Original Language
                    </span>
                    <span>
                      {new Intl.DisplayNames(["en"], { type: "language" }).of(
                        movie.original_language
                      )}
                    </span>
                  </div>

                  {movie.budget > 0 && (
                    <div>
                      <span className="text-gray-400 block">Budget</span>
                      <span>${formatNumber(movie.budget)}</span>
                    </div>
                  )}

                  {movie.revenue > 0 && (
                    <div>
                      <span className="text-gray-400 block">Revenue</span>
                      <span>${formatNumber(movie.revenue)}</span>
                    </div>
                  )}
                </div>

                {movie.homepage && (
                  <a
                    href={movie.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-4 text-blue-500 hover:underline"
                  >
                    Official Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error(`Error rendering movie ${params.id} page:`, error);
    return (
      <div className="mt-16 container-custom py-8">
        <ErrorFallback
          title="Movie Not Found"
          message="We couldn't load this movie. It may not exist or there was a problem connecting to our database."
        />
      </div>
    );
  }
}
