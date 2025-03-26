import { Metadata } from "next";
import { getMockMovieDetails } from "@/utils/mockData";
import { getImageUrl } from "@/utils/imageUtils";

type Params = {
  id: string;
};

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  try {
    // Get the movie ID from params
    const id = params.id ? parseInt(params.id) : 0;
    const movie = await getMockMovieDetails(id);

    return {
      title: `${movie.title} | StreamLoom`,
      description: movie.overview.substring(0, 160),
      openGraph: {
        images: [
          {
            url: getImageUrl(movie.poster_path, "w500") || "/placeholder-movie-1.jpg",
            width: 500,
            height: 750,
            alt: movie.title,
          },
        ],
      },
    };
  } catch (error) {
    return {
      title: "Movie | StreamLoom",
      description: "View movie details on StreamLoom",
    };
  }
} 