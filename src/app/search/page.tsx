import { Metadata } from "next";
import { searchMovies } from "@/services/movieService";
import MovieGrid from "@/components/MovieGrid";
import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";

interface SearchPageProps {
  searchParams: {
    q?: string;
    page?: string;
  };
}

export function generateMetadata({ searchParams }: SearchPageProps): Metadata {
  return {
    title: `${searchParams.q || "Search"} - StreamLoom`,
    description: `Search results for "${searchParams.q || ""}" on StreamLoom`,
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || "";
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;

  const movieData = query
    ? await searchMovies(query, currentPage)
    : { results: [], total_pages: 0, total_results: 0 };

  return (
    <>
      <PageHeader
        title={query ? `Search Results for "${query}"` : "Search Movies"}
        description={
          movieData.total_results
            ? `Found ${movieData.total_results} results`
            : "Enter a search term to find movies"
        }
      />

      <div className="container-custom py-8">
        {query ? (
          <>
            {movieData.results.length > 0 ? (
              <>
                <MovieGrid movies={movieData.results} />

                <div className="mt-10">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={Math.min(movieData.total_pages, 500)}
                    baseUrl={`/search?q=${encodeURIComponent(query)}&`}
                  />
                </div>
              </>
            ) : (
              <div className="py-12 text-center">
                <p className="text-gray-400 text-lg">
                  No movies found for "{query}"
                </p>
                <p className="text-gray-500 mt-2">
                  Try a different search term
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="py-12 text-center">
            <p className="text-gray-400 text-lg">
              Enter a search term to find movies
            </p>
          </div>
        )}
      </div>
    </>
  );
}
