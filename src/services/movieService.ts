import axios, { AxiosInstance } from 'axios';
import { Movie, MovieDetails, MovieListResponse } from '@/types/movie';
import mockMovieResponses, { getMockMovieDetails, searchMockMovies } from '@/utils/mockData';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

// Flag to track if we should use real API or mock data
let useRealApi = true;

// Create an Axios instance with a timeout
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
  timeout: 10000, // 10 seconds timeout
});

// Function to check if the API is available
export const checkApiAvailability = async (): Promise<boolean> => {
  try {
    const { data } = await api.get('/configuration');
    useRealApi = true;
    return true;
  } catch (error) {
    console.error('API check failed, switching to mock data:', error);
    useRealApi = false;
    return false;
  }
};

// Initial check for API availability
checkApiAvailability().then((isAvailable) => {
  console.log(`API ${isAvailable ? 'is' : 'is not'} available`);
});

export const getImageUrl = (path: string | null, size = 'w500') => {
  if (!path) return null;
  
  // If path is a full URL (like in mock data), return it directly
  if (path.startsWith('http')) {
    return path;
  }
  
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const getMovies = async (endpoint: string, page = 1): Promise<MovieListResponse> => {
  try {
    // Try using the real API if available
    if (useRealApi) {
      const { data } = await api.get<MovieListResponse>(endpoint, {
        params: { page },
      });
      return data;
    } else {
      // Fall back to mock data
      const mockCategory = endpoint.split('/').pop() || 'popular';
      
      // Map endpoint to the corresponding mock data category
      let mockData: MovieListResponse;
      
      if (endpoint.includes('trending')) {
        mockData = mockMovieResponses.trending;
      } else if (endpoint.includes('top_rated')) {
        mockData = mockMovieResponses.topRated;
      } else if (endpoint.includes('upcoming')) {
        mockData = mockMovieResponses.upcoming;
      } else if (endpoint.includes('now_playing')) {
        mockData = mockMovieResponses.nowPlaying;
      } else {
        // Default to popular
        mockData = mockMovieResponses.popular;
      }
      
      return {
        ...mockData,
        page,
      };
    }
  } catch (error) {
    console.error('Error fetching movies:', error);
    useRealApi = false; // Switch to mock data for future requests
    
    // Determine which mock data to use
    const mockCategory = endpoint.split('/').pop() || 'popular';
    let mockData: MovieListResponse;
    
    if (endpoint.includes('trending')) {
      mockData = mockMovieResponses.trending;
    } else if (endpoint.includes('top_rated')) {
      mockData = mockMovieResponses.topRated;
    } else if (endpoint.includes('upcoming')) {
      mockData = mockMovieResponses.upcoming;
    } else if (endpoint.includes('now_playing')) {
      mockData = mockMovieResponses.nowPlaying;
    } else {
      // Default to popular
      mockData = mockMovieResponses.popular;
    }
    
    return {
      ...mockData,
      page,
    };
  }
};

export const getMovieDetails = async (id: number): Promise<MovieDetails> => {
  try {
    // Try using the real API if available
    if (useRealApi) {
      const { data } = await api.get<MovieDetails>(`/movie/${id}`, {
        params: {
          append_to_response: 'videos,credits,similar',
        },
      });
      return data;
    } else {
      // Fall back to mock data
      return getMockMovieDetails(id);
    }
  } catch (error) {
    console.error(`Error fetching movie details for ID ${id}:`, error);
    useRealApi = false; // Switch to mock data for future requests
    
    // Return mock movie details
    return getMockMovieDetails(id);
  }
};

export const searchMovies = async (query: string, page = 1): Promise<MovieListResponse> => {
  try {
    // Try using the real API if available
    if (useRealApi) {
      const { data } = await api.get<MovieListResponse>('/search/movie', {
        params: {
          query,
          page,
        },
      });
      return data;
    } else {
      // Fall back to mock data
      return searchMockMovies(query);
    }
  } catch (error) {
    console.error('Error searching movies:', error);
    useRealApi = false; // Switch to mock data for future requests
    
    // Return mock search results
    return searchMockMovies(query);
  }
};

// API Endpoints
export const API_ENDPOINTS = {
  trending: '/trending/movie/week',
  popular: '/movie/popular',
  topRated: '/movie/top_rated',
  upcoming: '/movie/upcoming',
  nowPlaying: '/movie/now_playing',
};

export const getTrendingMovies = (page = 1) => getMovies(API_ENDPOINTS.trending, page);
export const getPopularMovies = (page = 1) => getMovies(API_ENDPOINTS.popular, page);
export const getTopRatedMovies = (page = 1) => getMovies(API_ENDPOINTS.topRated, page);
export const getUpcomingMovies = (page = 1) => getMovies(API_ENDPOINTS.upcoming, page);
export const getNowPlayingMovies = (page = 1) => getMovies(API_ENDPOINTS.nowPlaying, page); 