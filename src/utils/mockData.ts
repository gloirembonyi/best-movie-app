import { Movie, MovieDetails, MovieListResponse } from '@/types/movie';
import { generateRandomRating } from './formatters';

// Mock trending movies
const mockTrendingMovies: Movie[] = [
  {
    id: 1,
    title: "Interstellar",
    overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdrop_path: "/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
    release_date: "2014-11-05",
    vote_average: 8.4,
    vote_count: 25000,
    popularity: 100.5,
    genre_ids: [12, 18, 878],
    adult: false,
    video: false,
    original_language: "en",
  },
  {
    id: 2,
    title: "The Dark Knight",
    overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop_path: "/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg",
    release_date: "2008-07-18",
    vote_average: 8.5,
    vote_count: 24000,
    popularity: 95.8,
    genre_ids: [28, 80, 18, 53],
    adult: false,
    video: false,
    original_language: "en",
  },
  {
    id: 3,
    title: "Avatar",
    overview: "In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission, but becomes torn between following orders and protecting an alien civilization.",
    poster_path: "/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg",
    backdrop_path: "/o0s4XsEDfDlvit5pDRKjzXR4pp2.jpg",
    release_date: "2009-12-18",
    vote_average: 7.8,
    vote_count: 23000,
    popularity: 102.1,
    genre_ids: [28, 12, 14, 878],
    adult: false,
    video: false,
    original_language: "en",
  },
  {
    id: 4,
    title: "Inception",
    overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    backdrop_path: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    release_date: "2010-07-16",
    vote_average: 8.3,
    vote_count: 28000,
    popularity: 88.4,
    genre_ids: [28, 878, 53],
    adult: false,
    video: false,
    original_language: "en",
  },
  {
    id: 5,
    title: "The Matrix",
    overview: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    poster_path: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    backdrop_path: "/fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg",
    release_date: "1999-03-31",
    vote_average: 8.2,
    vote_count: 20000,
    popularity: 78.9,
    genre_ids: [28, 878],
    adult: false,
    video: false,
    original_language: "en",
  },
  {
    id: 6,
    title: "The Shawshank Redemption",
    overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    backdrop_path: "/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
    release_date: "1994-09-23",
    vote_average: 8.7,
    vote_count: 22000,
    popularity: 74.3,
    genre_ids: [18, 80],
    adult: false,
    video: false,
    original_language: "en",
  }
];

// Mock popular movies
const mockPopularMovies: Movie[] = [
  {
    id: 7,
    title: "Pulp Fiction",
    overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    backdrop_path: "/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg",
    release_date: "1994-10-14",
    vote_average: 8.5,
    vote_count: 21000,
    popularity: 80.1,
    genre_ids: [53, 80],
    adult: false,
    video: false,
    original_language: "en",
  },
  {
    id: 8,
    title: "Titanic",
    overview: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
    poster_path: "/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
    backdrop_path: "/3WjbxaqYDykaEfWNHMNSGuAUOPu.jpg",
    release_date: "1997-12-19",
    vote_average: 7.9,
    vote_count: 19000,
    popularity: 98.3,
    genre_ids: [18, 10749],
    adult: false,
    video: false,
    original_language: "en",
  },
  {
    id: 9,
    title: "Star Wars: Episode IV - A New Hope",
    overview: "Princess Leia is captured and held hostage by the evil Imperial forces in their effort to take over the galactic Empire. Venturesome Luke Skywalker and dashing captain Han Solo team together with the lovable robot duo R2-D2 and C-3PO to rescue the beautiful princess and restore peace and justice in the Empire.",
    poster_path: "/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
    backdrop_path: "/zqkmTXzjkAgXmEWLRsY4UpTWCeo.jpg",
    release_date: "1977-05-25",
    vote_average: 8.2,
    vote_count: 16000,
    popularity: 76.8,
    genre_ids: [12, 28, 878],
    adult: false,
    video: false,
    original_language: "en",
  },
  // Add more popular movies as needed...
];

// Mock top rated movies
const mockTopRatedMovies: Movie[] = [
  {
    id: 10,
    title: "The Godfather",
    overview: "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.",
    poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    backdrop_path: "/rSPw7tgCH9c6NqICZef4kZjFOQ5.jpg",
    release_date: "1972-03-14",
    vote_average: 8.7,
    vote_count: 15000,
    popularity: 71.4,
    genre_ids: [18, 80],
    adult: false,
    video: false,
    original_language: "en",
  },
  {
    id: 11,
    title: "Spirited Away",
    overview: "A young girl, Chihiro, becomes trapped in a strange new world of spirits. When her parents undergo a mysterious transformation, she must call upon the courage she never knew she had to free her family.",
    poster_path: "/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
    backdrop_path: "/bSXfU4dwZyBA1vMmXvejdRXBD9.jpg",
    release_date: "2001-07-20",
    vote_average: 8.5,
    vote_count: 12000,
    popularity: 68.9,
    genre_ids: [16, 10751, 14],
    adult: false,
    video: false,
    original_language: "ja",
  },
  {
    id: 12,
    title: "Parasite",
    overview: "All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.",
    poster_path: "/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    backdrop_path: "/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg",
    release_date: "2019-05-30",
    vote_average: 8.5,
    vote_count: 13000,
    popularity: 85.3,
    genre_ids: [35, 53, 18],
    adult: false,
    video: false,
    original_language: "ko",
  },
  // Add more top rated movies as needed...
];

// Mock upcoming movies
const mockUpcomingMovies: Movie[] = [
  {
    id: 13,
    title: "Dune: Part Two",
    overview: "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family.",
    poster_path: "/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
    backdrop_path: "/zDNAeWU0PrIZdpdBY3qJgzhW9D3.jpg",
    release_date: "2024-03-01",
    vote_average: 8.1,
    vote_count: 9000,
    popularity: 110.2,
    genre_ids: [878, 12],
    adult: false,
    video: false,
    original_language: "en",
  },
  {
    id: 14,
    title: "Furiosa: A Mad Max Saga",
    overview: "As the world fell, young Furiosa is snatched from the Green Place of Many Mothers and falls into the hands of a great Biker Horde led by the Warlord Dementus.",
    poster_path: "/n5oo7UvZOfQRXXEBepjvfJPc5CX.jpg",
    backdrop_path: "/kdNkgUGzYGzFZ1iEGCuO8moRll2.jpg",
    release_date: "2024-05-24",
    vote_average: 7.8,
    vote_count: 8000,
    popularity: 95.7,
    genre_ids: [28, 12, 878],
    adult: false,
    video: false,
    original_language: "en",
  },
  {
    id: 15,
    title: "The Batman 2",
    overview: "Follow-up to Matt Reeves's The Batman (2022), focusing on Batman's continued efforts to clean up Gotham City.",
    poster_path: "/jKQOkE8Gx0QyGIjXPYoFS5X4p3g.jpg",
    backdrop_path: "/t2K5ttrQZpKWIsj2yXDp9TjZkxW.jpg",
    release_date: "2025-10-03",
    vote_average: 8.3,
    vote_count: 7000,
    popularity: 88.5,
    genre_ids: [28, 80, 9648],
    adult: false,
    video: false,
    original_language: "en",
  },
  // Add more upcoming movies as needed...
];

// Mock now playing movies
const mockNowPlayingMovies: Movie[] = [
  {
    id: 16,
    title: "Godzilla x Kong: The New Empire",
    overview: "Following their explosive showdown, Godzilla and Kong must reunite against a colossal undiscovered threat hidden within our world, challenging their very existence – and our own.",
    poster_path: "/tneI8q5qgZ5QM5cJfn7J4jrLdKZ.jpg",
    backdrop_path: "/zv3fpGXBhWA1DreMQbwLQKgxRCV.jpg",
    release_date: "2024-03-29",
    vote_average: 7.5,
    vote_count: 10000,
    popularity: 115.6,
    genre_ids: [28, 12, 878],
    adult: false,
    video: false,
    original_language: "en",
  },
  {
    id: 17,
    title: "Kingdom of the Planet of the Apes",
    overview: "Several generations in the future following Caesar's reign, apes are now the dominant species and live harmoniously while humans have been reduced to living in the shadows. As a new ape ruler builds his empire, one young ape undertakes a journey that will lead him to question everything he's been taught about the past and make choices that will define the future for apes and humans alike.",
    poster_path: "/5gzRKBftRUjNAXm7y1myghh7I3W.jpg",
    backdrop_path: "/oS3nGBo8eBLUxQnm5q07g1kUrmb.jpg",
    release_date: "2024-05-10",
    vote_average: 7.9,
    vote_count: 9500,
    popularity: 105.3,
    genre_ids: [28, 12, 878],
    adult: false,
    video: false,
    original_language: "en",
  },
  {
    id: 18,
    title: "Bad Boys: Ride or Die",
    overview: "Miami detectives Mike Lowrey and Marcus Burnett face a new foe as they try to clear the name of their beloved former police captain.",
    poster_path: "/7PPVJvLz0fn8JiT6V0pWfhXcXkT.jpg",
    backdrop_path: "/xn36vVWUJLVqjrpyQpLAfYvkVlp.jpg",
    release_date: "2024-06-07",
    vote_average: 7.2,
    vote_count: 8500,
    popularity: 98.7,
    genre_ids: [28, 35, 80],
    adult: false,
    video: false,
    original_language: "en",
  },
  // Add more now playing movies as needed...
];

// Mock movie details (for a specific movie)
export const getMockMovieDetails = (id: number): MovieDetails => {
  // First check if the ID exists in any of our mock collections
  const allMockMovies = [
    ...mockTrendingMovies,
    ...mockPopularMovies,
    ...mockTopRatedMovies,
    ...mockUpcomingMovies,
    ...mockNowPlayingMovies
  ];
  
  const foundMovie = allMockMovies.find(movie => movie.id === id);
  
  if (foundMovie) {
    return {
      ...foundMovie,
      genres: [
        { id: 28, name: "Action" },
        { id: 12, name: "Adventure" },
        { id: 878, name: "Science Fiction" }
      ],
      runtime: 150,
      tagline: "The adventure continues...",
      status: "Released",
      budget: 200000000,
      revenue: 750000000,
      homepage: "https://example.com/movie",
      production_companies: [
        { id: 1, name: "Universal Pictures", logo_path: "/7PzJdsLGlR7oW4J0J5Xcd0pHGRg.png" }
      ],
      videos: {
        results: [
          {
            id: "video1",
            key: "dQw4w9WgXcQ", // Rick Roll as placeholder
            name: "Official Trailer",
            site: "YouTube",
            type: "Trailer",
            published_at: "2023-01-01"
          }
        ]
      },
      credits: {
        cast: [
          {
            id: 1001,
            name: "John Smith",
            character: "Hero",
            profile_path: "/vTMWnTQKkCCzlOlIJXMF6CmGbGq.jpg"
          },
          {
            id: 1002,
            name: "Jane Doe",
            character: "Heroine",
            profile_path: "/vMZSKqBS0tAZea4D8GgJu43q86u.jpg"
          },
          {
            id: 1003,
            name: "Bob Johnson",
            character: "Villain",
            profile_path: "/1YjdSym1jTG7xjHSI0yGGWEsw5i.jpg"
          },
          {
            id: 1004,
            name: "Sarah Williams",
            character: "Supporting Character",
            profile_path: "/2daC5DeXqwkFID6F2gS7wqp4wTT.jpg"
          }
        ],
        crew: [
          {
            id: 2001,
            name: "Christopher Nolan",
            job: "Director",
            department: "Directing",
            profile_path: "/9NAZmfYxcjlZ0ZDiVWdQZ3AJ3gS.jpg"
          },
          {
            id: 2002,
            name: "Hans Zimmer",
            job: "Composer",
            department: "Sound",
            profile_path: "/tpQnDeP2avCugJ7xKj8cIz7Mmpt.jpg"
          },
          {
            id: 2003,
            name: "Jonathan Nolan",
            job: "Screenplay",
            department: "Writing",
            profile_path: "/aGzYC2LOSN4Oc3WvKAMiACJyVBl.jpg"
          }
        ]
      },
      similar: {
        results: allMockMovies.filter(m => 
          m.id !== id && 
          m.genre_ids.some(g => foundMovie.genre_ids.includes(g))
        ).slice(0, 6)
      }
    };
  }
  
  // Default movie details if ID not found
  return {
    id: id,
    title: `Movie ${id}`,
    overview: "This is a mock movie created as a placeholder when the API is unavailable.",
    poster_path: null,
    backdrop_path: null,
    release_date: "2023-01-01",
    vote_average: parseFloat(generateRandomRating()),
    vote_count: Math.floor(Math.random() * 10000),
    popularity: Math.random() * 100,
    genre_ids: [28, 12, 878],
    genres: [
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" },
      { id: 878, name: "Science Fiction" }
    ],
    runtime: 120,
    tagline: "A simulated movie experience",
    status: "Released",
    budget: 150000000,
    revenue: 500000000,
    homepage: "",
    production_companies: [],
    videos: { results: [] },
    credits: { cast: [], crew: [] },
    similar: { results: [] },
    adult: false,
    video: false,
    original_language: "en"
  };
};

// Mock movie list responses
export const mockMovieResponses: Record<string, MovieListResponse> = {
  trending: {
    page: 1,
    results: mockTrendingMovies,
    total_pages: 5,
    total_results: 100
  },
  popular: {
    page: 1,
    results: mockPopularMovies,
    total_pages: 5,
    total_results: 100
  },
  topRated: {
    page: 1,
    results: mockTopRatedMovies,
    total_pages: 5,
    total_results: 100
  },
  upcoming: {
    page: 1,
    results: mockUpcomingMovies,
    total_pages: 5,
    total_results: 100
  },
  nowPlaying: {
    page: 1,
    results: mockNowPlayingMovies,
    total_pages: 5,
    total_results: 100
  }
};

// Search mock movies
export const searchMockMovies = (query: string): MovieListResponse => {
  const allMockMovies = [
    ...mockTrendingMovies,
    ...mockPopularMovies,
    ...mockTopRatedMovies,
    ...mockUpcomingMovies,
    ...mockNowPlayingMovies
  ];
  
  const lowercaseQuery = query.toLowerCase();
  const results = allMockMovies.filter(movie => 
    movie.title.toLowerCase().includes(lowercaseQuery) || 
    movie.overview.toLowerCase().includes(lowercaseQuery)
  );
  
  return {
    page: 1,
    results,
    total_pages: 1,
    total_results: results.length
  };
};

export default mockMovieResponses; 