/**
 * Get URL for movie images with specified size
 * @param path Image path from API
 * @param size Size of image (w500, original, etc.)
 * @returns Full image URL
 */
export const getImageUrl = (path: string | null, size: string = "w500"): string => {
  // If no path is provided or it's null
  if (!path) {
    return getPlaceholder('poster'); // Use our placeholder function
  }
  
  // If the path is already a full URL (starts with http)
  if (path.startsWith('http')) {
    return path;
  }
  
  // If it's a local path (starts with '/')
  if (path.startsWith('/')) {
    return path;
  }
  
  // Use environment variable to determine if we should use real TMDB images
  // This allows switching to local images when TMDB is unavailable
  const useMockData = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';
  
  if (useMockData) {
    // Return a placeholder when in mock mode
    return getPlaceholder(size.includes('backdrop') ? 'backdrop' : 'poster');
  }
  
  // For TMDB images, use this format
  try {
    return `https://image.tmdb.org/t/p/${size}${path}`;
  } catch (error) {
    console.error('Error forming image URL:', error);
    return getPlaceholder(size.includes('backdrop') ? 'backdrop' : 'poster');
  }
};

/**
 * Determine which placeholder to use based on context
 * @param type The type of placeholder needed
 * @returns Path to the placeholder image
 */
export const getPlaceholder = (type: 'poster' | 'backdrop' | 'profile' = 'poster'): string => {
  switch (type) {
    case 'backdrop':
      return '/placeholder-backdrop.jpg';
    case 'profile':
      return '/placeholder-profile.jpg';
    case 'poster':
    default:
      // Randomly select one of the movie placeholders
      const randomNum = Math.floor(Math.random() * 5) + 1;
      return `/placeholder-movie-${randomNum}.jpg`;
  }
};

/**
 * Handle image loading errors
 * @param event The error event
 * @param type The type of image that failed to load
 */
export const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>, type: 'poster' | 'backdrop' | 'profile' = 'poster'): void => {
  const imgElement = event.currentTarget;
  imgElement.onerror = null; // Prevent infinite loop
  imgElement.src = getPlaceholder(type);
}; 