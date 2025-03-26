import { Metadata } from "next";
import { getTrendingMovies } from "@/services/movieService";
import MovieGrid from "@/components/MovieGrid";
import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import ErrorFallback from "@/components/ErrorFallback";

export const metadata: Metadata = {
  title: "Trending Movies | StreamLoom",
  description: "Discover the most trending movies of the week.",
};

interface TrendingPageProps {
  searchParams: {
    page?: string;
  };
}

export default async function TrendingPage({
  searchParams,
}: TrendingPageProps) {
  try {
    const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
    const movieData = await getTrendingMovies(currentPage);
    
    if (movieData.results.length === 0) {
      return (
        <>
          <PageHeader
            title="Trending Movies"
            description="The most talked about movies this week"
          />
          <div className="container-custom py-8">
            <ErrorFallback title="No Trending Movies Found" message="Could not retrieve trending movies. Please try again later." />
          </div>
        </>
      );
    }
    
    return (
      <>
        <PageHeader
          title="Trending Movies"
          description="The most talked about movies this week"
        />

        <div className="container-custom py-8">
          <MovieGrid movies={movieData.results} />

          <div className="mt-10">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.min(movieData.total_pages, 500)}
              baseUrl="/trending"
            />
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error('Error rendering trending page:', error);
    return (
      <>
        <PageHeader title="Trending Movies" description="The most talked about movies this week" />
        <div className="container-custom py-8">
          <ErrorFallback />
        </div>
      </>
    );
  }
}
