/**
 * Format movie runtime from minutes to hours and minutes
 * @param minutes Total runtime in minutes
 * @returns Formatted string like "2h 15m"
 */
export const formatRuntime = (minutes: number): string => {
  if (!minutes) return "N/A";
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours === 0) {
    return `${remainingMinutes}m`;
  }
  
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  
  return `${hours}h ${remainingMinutes}m`;
};

/**
 * Generate a random rating between 6.0 and 9.5
 * @returns Rating string with one decimal place
 */
export const generateRandomRating = (): string => {
  const min = 6.0;
  const max = 9.5;
  const rating = min + Math.random() * (max - min);
  return rating.toFixed(1);
};

/**
 * Format release date to display year only
 * @param dateString Date in format YYYY-MM-DD
 * @returns Year only (YYYY)
 */
export const formatReleaseYear = (dateString: string): string => {
  if (!dateString) return "";
  return new Date(dateString).getFullYear().toString();
};

/**
 * Convert minutes to readable time format
 * @param minutes Total minutes
 * @returns Time in format HH:MM
 */
export const minutesToTime = (minutes: number): string => {
  if (!minutes) return "00:00";
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

/**
 * Format large numbers with commas
 * @param num Number to format
 * @returns Formatted number with commas
 */
export const formatNumber = (num: number): string => {
  if (!num && num !== 0) return "N/A";
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * Format currency amounts
 * @param amount Number to format
 * @param currency Currency symbol (default: $)
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number, currency: string = "$"): string => {
  if (!amount && amount !== 0) return "N/A";
  return `${currency}${formatNumber(amount)}`;
};

/**
 * Format a date string to a readable format
 * @param dateString Date in format YYYY-MM-DD
 * @returns Formatted date string like "January 1, 2023"
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return "Unknown";
  
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  
  return new Date(dateString).toLocaleDateString("en-US", options);
};

/**
 * Format rating for display
 * @param rating Number rating value
 * @returns Formatted rating with one decimal place
 */
export const formatRating = (rating: number): string => {
  if (!rating && rating !== 0) return "N/A";
  return rating.toFixed(1);
};

/**
 * Format YouTube video URL from key
 * @param key YouTube video key
 * @returns Full YouTube URL
 */
export const getYoutubeUrl = (key: string): string => {
  if (!key) return '';
  return `https://www.youtube.com/watch?v=${key}`;
}; 