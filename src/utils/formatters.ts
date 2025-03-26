// Date formatter
export const formatDate = (dateString: string) => {
  if (!dateString) return "Unknown";
  
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  
  return new Date(dateString).toLocaleDateString("en-US", options);
};

// Runtime formatter (minutes to hours and minutes)
export const formatRuntime = (minutes: number) => {
  if (!minutes) return "Unknown";
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) return `${mins}m`;
  return `${hours}h ${mins}m`;
};

// Rating formatter (round to 1 decimal place)
export const formatRating = (rating: number) => {
  if (!rating && rating !== 0) return "N/A";
  return rating.toFixed(1);
};

// Format large numbers with commas
export const formatNumber = (num: number) => {
  if (!num) return "0";
  return num.toLocaleString('en-US');
};

// Get YouTube embed URL from video key
export const getYoutubeUrl = (videoKey: string) => {
  return `https://www.youtube.com/embed/${videoKey}?autoplay=0&controls=1&modestbranding=1&rel=0`;
};

// Format movie release year
export const formatYear = (dateString: string) => {
  if (!dateString) return "";
  return new Date(dateString).getFullYear().toString();
};

// Generate a random rating for mock data
export const generateRandomRating = () => {
  return (Math.random() * 4 + 6).toFixed(1); // Random between 6.0 and 10.0
};

// Format currency
export const formatCurrency = (amount: number) => {
  if (!amount) return "N/A";
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  
  return formatter.format(amount);
}; 