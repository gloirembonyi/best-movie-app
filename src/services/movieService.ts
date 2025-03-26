import axios from 'axios';
import { Movie, MovieDetails, MovieListResponse } from '@/types/movie';

// Create a configured Axios instance
const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY || '3fd2be6f0c70a2a598f084ddfb75487c', // Demo key as fallback
  },
  timeout: 15000,
});

// For temporary caching to reduce API calls
const cache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_TTL = 5 * 60 * 1000; // Cache for 5 minutes

/**
 * Get data with caching support
 */
async function fetchWithCache<T>(url: string, params = {}): Promise<T> {
  const cacheKey = `${url}:${JSON.stringify(params)}`;
  const now = Date.now();
  
  // Return cached data if available and fresh
  if (cache[cacheKey] && now - cache[cacheKey].timestamp < CACHE_TTL) {
    return cache[cacheKey].data as T;
  }
  
  try {
    // Use mock data if we're in offline mode or testing
    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
      const mockData = await import('@/utils/mockData');
      // Determine which mock data to return based on URL
      if (url.includes('/movie/popular')) return mockData.getMockMovies() as T;
      if (url.includes('/trending')) return mockData.getMockMovies() as T;
      if (url.includes('/top_rated')) return mockData.getMockMovies() as T;
      if (url.match(/\/movie\/\d+$/)) {
        const id = parseInt(url.split('/').pop() || '1');
        return mockData.getMockMovieDetails(id) as T;
      }
      return mockData.getMockMovies() as T;
    }
    
    const response = await api.get<T>(url, { params });
    
    // Cache the response
    cache[cacheKey] = {
      data: response.data,
      timestamp: now,
    };
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    
    // Fall back to mock data if API call fails
    try {
      console.log('Falling back to mock data');
      const mockData = await import('@/utils/mockData');
      if (url.includes('/movie/popular')) return mockData.getMockMovies() as T;
      if (url.includes('/trending')) return mockData.getMockMovies() as T;
      if (url.includes('/top_rated')) return mockData.getMockMovies() as T;
      if (url.match(/\/movie\/\d+$/)) {
        const id = parseInt(url.split('/').pop() || '1');
        return mockData.getMockMovieDetails(id) as T;
      }
      return mockData.getMockMovies() as T;
    } catch (mockError) {
      console.error('Error fetching mock data:', mockError);
      throw error; // Re-throw the original error if mock data also fails
    }
  }
}

/**
 * Get popular movies
 */
export async function getPopularMovies(page: number = 1): Promise<MovieListResponse> {
  return fetchWithCache<MovieListResponse>('/movie/popular', { page });
}

/**
 * Get trending movies
 */
export async function getTrendingMovies(page: number = 1): Promise<MovieListResponse> {
  return fetchWithCache<MovieListResponse>('/trending/movie/week', { page });
}

/**
 * Get top rated movies
 */
export async function getTopRatedMovies(page: number = 1): Promise<MovieListResponse> {
  return fetchWithCache<MovieListResponse>('/movie/top_rated', { page });
}

/**
 * Get movie details
 */
export async function getMovieDetails(id: number): Promise<MovieDetails> {
  return fetchWithCache<MovieDetails>(`/movie/${id}`, {
    append_to_response: 'videos,credits,similar',
  });
}

/**
 * Search movies by query
 */
export async function searchMovies(query: string, page: number = 1): Promise<MovieListResponse> {
  return fetchWithCache<MovieListResponse>('/search/movie', { query, page });
}

/**
 * Get movies by genre
 */
export async function getMoviesByGenre(genreId: number, page: number = 1): Promise<MovieListResponse> {
  return fetchWithCache<MovieListResponse>('/discover/movie', {
    with_genres: genreId,
    page,
  });
}

/**
 * Check if the API is available
 */
export async function checkApiAvailability(): Promise<boolean> {
  try {
    await api.get('/configuration');
    console.log('API is available');
    return true;
  } catch (error) {
    console.log('API is not available');
    return false;
  }
} 