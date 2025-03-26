"use client";

import { useState, useEffect, useRef } from "react";
import {
  FaPlay,
  FaPause,
  FaExpand,
  FaCompress,
  FaVolumeUp,
  FaVolumeMute,
  FaRedo,
} from "react-icons/fa";
import { motion } from "framer-motion";

interface VideoPlayerProps {
  videoKey: string;
  isMainMovie?: boolean;
  movieId?: number;
  posterImage?: string;
  title?: string;
}

export default function VideoPlayer({
  videoKey,
  isMainMovie = false,
  movieId,
  posterImage,
  title = "Movie",
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [hasFallback, setHasFallback] = useState(false);
  const [errorCount, setErrorCount] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // For YouTube embed
  const isYouTube =
    !isMainMovie && videoKey !== "movie" && videoKey?.length > 5;

  // Function to create mock/fallback video source
  const getFallbackSource = () => {
    if (isMainMovie) {
      return `/movies/movie_${movieId || "1"}.mp4`;
    }
    return `/trailers/trailer_default.mp4`;
  };

  // Get poster image
  const getPosterImage = () => {
    if (posterImage) return posterImage;
    if (isMainMovie) {
      return `/placeholder-movie-${(movieId ?? 1) % 5 || 1}.jpg`;
    }
    return `/placeholder-backdrop.jpg`;
  };

  // Setup player
  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    // Handle video events
    const onLoadedMetadata = () => {
      setDuration(video.duration);
      setIsLoading(false);
    };

    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      if (video) video.currentTime = 0;
    };

    const onError = () => {
      console.error("Video error occurred");
      setErrorCount((prev) => prev + 1);
      setHasFallback(true);
      setIsLoading(false);
    };

    // Add event listeners
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);
    video.addEventListener("error", onError);

    // Set volume
    video.volume = volume;
    video.muted = isMuted;

    // Check if video source can be loaded - use shorter timeout
    const loadingTimeout = setTimeout(() => {
      if (isLoading) {
        setHasFallback(true);
        setIsLoading(false);
      }
    }, 2000);

    // Cleanup
    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("error", onError);
      clearTimeout(loadingTimeout);
    };
  }, [isMainMovie, volume, isLoading, isMuted]);

  // Play/pause
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch((error) => {
          console.error("Play failed:", error);
          setIsPlaying(false);
          setHasFallback(true);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Auto-hide controls
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);

      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }

      if (isPlaying) {
        controlsTimeoutRef.current = setTimeout(() => {
          setShowControls(false);
        }, 3000);
      }
    };

    const containerElement = containerRef.current;
    if (containerElement) {
      containerElement.addEventListener("mousemove", handleMouseMove);
      containerElement.addEventListener("click", handleMouseMove);
    }

    return () => {
      if (containerElement) {
        containerElement.removeEventListener("mousemove", handleMouseMove);
        containerElement.removeEventListener("click", handleMouseMove);
      }

      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying]);

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume;
        videoRef.current.muted = false;
        setIsMuted(false);
      } else {
        videoRef.current.volume = 0;
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  // Handle seeking
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      try {
        if (containerRef.current.requestFullscreen) {
          containerRef.current.requestFullscreen();
        } else if ((containerRef.current as any).webkitRequestFullscreen) {
          (containerRef.current as any).webkitRequestFullscreen();
        } else if ((containerRef.current as any).msRequestFullscreen) {
          (containerRef.current as any).msRequestFullscreen();
        }
      } catch (error) {
        console.error("Fullscreen error:", error);
      }
    } else {
      try {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          (document as any).webkitExitFullscreen();
        } else if ((document as any).msExitFullscreen) {
          (document as any).msExitFullscreen();
        }
      } catch (error) {
        console.error("Exit fullscreen error:", error);
      }
    }
  };

  // Format time (seconds -> MM:SS)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Reset video player
  const resetPlayer = () => {
    setHasFallback(false);
    setIsLoading(true);
    setErrorCount(0);

    if (videoRef.current) {
      videoRef.current.load();

      // Small delay before attempting to play
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current
            .play()
            .then(() => {
              setIsPlaying(true);
              setIsLoading(false);
            })
            .catch((err) => {
              console.error("Play failed after reset:", err);
              setHasFallback(true);
              setIsLoading(false);
            });
        }
      }, 500);
    }
  };

  // Always use fallback for three or more errors
  if (errorCount >= 3) {
    return (
      <div className="relative w-full h-full flex items-center justify-center bg-gray-900 rounded-lg">
        <div className="text-center p-6 max-w-md">
          <div className="text-5xl mb-4">🎬</div>
          <h3 className="text-xl font-bold mb-2">Video Unavailable</h3>
          <p className="text-gray-300 mb-4">
            {isMainMovie
              ? "This movie is currently unavailable for playback."
              : "The trailer for this movie is currently unavailable."}
          </p>
          <div>
            <img
              src={getPosterImage()}
              alt={title}
              className="w-full h-auto rounded-lg shadow-lg mx-auto"
              style={{ maxHeight: "300px", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    );
  }

  // Render YouTube embed
  if (isYouTube) {
    return (
      <div className="relative w-full h-0 pb-[56.25%] bg-gray-900 rounded-lg overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=0&controls=1&modestbranding=1&rel=0`}
          title={`${title} Trailer`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full rounded-lg"
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full group bg-black rounded-lg overflow-hidden"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Loading */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 z-10">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Fallback/Error message */}
      {hasFallback && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-6 rounded-lg bg-gray-800/80 backdrop-blur-sm max-w-md"
          >
            <p className="text-xl font-semibold mb-3">Simulated Playback</p>
            <p className="text-gray-300 mb-4">
              {isMainMovie
                ? "This is a simulated movie playback environment."
                : "Using placeholder trailer for demonstration."}
            </p>
            <button
              onClick={() => {
                setHasFallback(false);
                setIsPlaying(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full flex items-center mx-auto"
            >
              <FaPlay className="mr-2" />
              Start Simulated Playback
            </button>
          </motion.div>
        </div>
      )}

      {/* Video element */}
      <video
        ref={videoRef}
        className="w-full h-full object-contain bg-black"
        poster={getPosterImage()}
        onClick={() => setIsPlaying(!isPlaying)}
        playsInline
      >
        <source src={getFallbackSource()} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Controls overlay */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/80 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: showControls ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: showControls ? "auto" : "none" }}
      >
        {/* Progress bar */}
        <div className="w-full mb-4">
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 bg-gray-500 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #3b82f6 ${
                (currentTime / (duration || 1)) * 100
              }%, rgba(255,255,255,0.2) ${
                (currentTime / (duration || 1)) * 100
              }%)`,
            }}
          />
        </div>

        {/* Control buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-white focus:outline-none hover:text-blue-400 transition-colors"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
            </button>

            <div className="flex items-center space-x-2">
              <button
                onClick={toggleMute}
                className="text-white focus:outline-none hover:text-blue-400 transition-colors"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <FaVolumeMute size={20} />
                ) : (
                  <FaVolumeUp size={20} />
                )}
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 md:w-24 h-1 bg-gray-500 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #3b82f6 ${
                    (isMuted ? 0 : volume) * 100
                  }%, rgba(255,255,255,0.2) ${(isMuted ? 0 : volume) * 100}%)`,
                }}
                aria-label="Volume"
              />
            </div>

            <span className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration || 0)}
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={resetPlayer}
              className="text-white focus:outline-none hover:text-blue-400 transition-colors"
              aria-label="Reload video"
            >
              <FaRedo size={16} />
            </button>

            <button
              onClick={toggleFullscreen}
              className="text-white focus:outline-none hover:text-blue-400 transition-colors"
              aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <FaCompress size={18} /> : <FaExpand size={18} />}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Big play button (shown when paused) */}
      {!isPlaying && !isLoading && !hasFallback && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setIsPlaying(true)}
          className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/40"
        >
          <div className="w-16 h-16 md:w-24 md:h-24 bg-blue-600/80 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
            <FaPlay size={30} className="ml-2" />
          </div>
        </motion.button>
      )}
    </div>
  );
}
