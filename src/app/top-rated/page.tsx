import { Metadata } from "next";
import { getTopRatedMovies } from "@/services/movieService";
import MovieGrid from "@/components/MovieGrid";
import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import ErrorFallback from "@/components/ErrorFallback";

export const metadata: Metadata = {
  title: "Top Rated Movies | StreamLoom",
  description: "Explore the highest-rated movies of all time.",
};

interface TopRatedPageProps {
  searchParams: {
    page?: string;
  };
}

export default async function TopRatedPage({
  searchParams,
}: TopRatedPageProps) {
  try {
    const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
    const movieData = await getTopRatedMovies(currentPage);

    if (movieData.results.length === 0) {
      return (
        <>
          <PageHeader
            title="Top Rated Movies"
            description="The highest-rated movies of all time"
          />
          <div className="container-custom py-8">
            <ErrorFallback
              title="No Top Rated Movies Found"
              message="Could not retrieve top rated movies. Please try again later."
            />
          </div>
        </>
      );
    }

    return (
      <>
        <PageHeader
          title="Top Rated Movies"
          description="The highest-rated movies of all time"
        />

        <div className="container-custom py-8">
          <MovieGrid movies={movieData.results} />

          <div className="mt-10">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.min(movieData.total_pages, 500)}
              baseUrl="/top-rated"
            />
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error("Error rendering top-rated page:", error);
    return (
      <>
        <PageHeader
          title="Top Rated Movies"
          description="The highest-rated movies of all time"
        />
        <div className="container-custom py-8">
          <ErrorFallback />
        </div>
      </>
    );
  }
}
