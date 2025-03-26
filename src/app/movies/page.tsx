import { Metadata } from "next";
import { getPopularMovies } from "@/services/movieService";
import MovieGrid from "@/components/MovieGrid";
import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import ErrorFallback from "@/components/ErrorFallback";

export const metadata: Metadata = {
  title: "Popular Movies | StreamLoom",
  description: "Browse the most popular movies from around the world.",
};

interface MoviesPageProps {
  searchParams: {
    page?: string;
  };
}

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
  try {
    const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
    const movieData = await getPopularMovies(currentPage);

    if (movieData.results.length === 0) {
      return (
        <>
          <PageHeader
            title="Popular Movies"
            description="The most popular movies from around the world"
          />
          <div className="container-custom py-8">
            <ErrorFallback
              title="No Movies Found"
              message="Could not retrieve popular movies. Please try again later."
            />
          </div>
        </>
      );
    }

    return (
      <>
        <PageHeader
          title="Popular Movies"
          description="The most popular movies from around the world"
        />

        <div className="container-custom py-8">
          <MovieGrid movies={movieData.results} />

          <div className="mt-10">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.min(movieData.total_pages, 500)}
              baseUrl="/movies"
            />
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error("Error rendering movies page:", error);
    return (
      <>
        <PageHeader
          title="Popular Movies"
          description="The most popular movies from around the world"
        />
        <div className="container-custom py-8">
          <ErrorFallback />
        </div>
      </>
    );
  }
}
