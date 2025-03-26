# Movie App

A modern, responsive movie application built with Next.js, TypeScript, and Tailwind CSS. This application showcases movies from The Movie Database (TMDB) API with a beautiful and responsive user interface.

## Features

- **Responsive Design**: Looks great on all devices from mobile to desktop
- **Movie Details**: View comprehensive details about any movie
- **Trending Movies**: Discover what's trending now
- **Search Functionality**: Find your favorite movies easily
- **Fallback System**: Uses local data when API connections fail
- **Video Player**: Custom video player with playback controls
- **Modern UI**: Sleek and intuitive user interface with animations

## Technologies Used

- **Next.js 14**: For server-side rendering and optimized performance
- **TypeScript**: For type safety and better development experience
- **Tailwind CSS**: For utility-first styling
- **Framer Motion**: For smooth animations and transitions
- **React Icons**: For a wide variety of icons
- **TMDB API**: For movie data

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/gloirembonyi/best-movie-app.git
   cd best-movie-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add:
   ```
   NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
   NEXT_PUBLIC_USE_MOCK_DATA=false
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Mock Data Mode

The app can run in mock data mode if TMDB API is unavailable or you don't have an API key:

1. Set `NEXT_PUBLIC_USE_MOCK_DATA=true` in your `.env.local` file
2. Restart the development server

## Deployment

This app can be easily deployed on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fgloirembonyi%2Fbest-movie-app)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [TMDB](https://www.themoviedb.org/) for providing the movie data API
- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
