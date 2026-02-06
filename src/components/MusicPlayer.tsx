import { useState, useRef, useEffect } from "react";
import { Music, Pause, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // YouTube embed URL - Ludovico Einaudi – Experience
  const YOUTUBE_VIDEO_ID = "_VONMkKkdf4";
  
  // Construct the embed URL with autoplay parameters
  const embedUrl = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?enablejsapi=1&loop=1&autoplay=1&mute=0&playlist=${YOUTUBE_VIDEO_ID}`;

  useEffect(() => {
    // Attempt to auto-play when component mounts
    // Note: Most browsers require user interaction before autoplay with sound
    const timer = setTimeout(() => {
      setIsPlaying(true);
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const togglePlay = () => {
    if (iframeRef.current?.contentWindow) {
      if (isPlaying) {
        // Pause the video
        iframeRef.current.contentWindow.postMessage(
          '{"event":"command","func":"pauseVideo","args":""}',
          "*"
        );
      } else {
        // Play the video
        iframeRef.current.contentWindow.postMessage(
          '{"event":"command","func":"playVideo","args":""}',
          "*"
        );
      }
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      {/* Hidden YouTube iframe */}
      <iframe
        ref={iframeRef}
        className="hidden"
        id="wedding-music"
        src={isLoaded ? embedUrl : ""}
        allow="autoplay; encrypted-media"
        title="Wedding Background Music"
      />

      {/* Floating music control button - adjusted for mobile bottom nav */}
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        className={cn(
          "fixed bottom-24 md:bottom-6 right-6 z-50",
          "w-14 h-14 rounded-full",
          "bg-primary/90 hover:bg-primary",
          "text-primary-foreground",
          "shadow-elegant hover:shadow-lg",
          "flex items-center justify-center",
          "transition-all duration-300 ease-in-out",
          "backdrop-blur-sm",
          "border border-primary-foreground/10",
          // Gentle pulse animation when playing
          isPlaying && "animate-pulse"
        )}
      >
        <div
          className={cn(
            "transition-transform duration-300",
            isPlaying ? "scale-100" : "scale-90"
          )}
        >
          {isPlaying ? (
            <div className="relative">
              <Volume2 className="w-6 h-6" />
              {/* Sound waves animation */}
              <span className="absolute -right-1 -top-1 w-2 h-2 bg-primary-foreground rounded-full animate-ping opacity-75" />
            </div>
          ) : (
            <Music className="w-6 h-6" />
          )}
        </div>
      </button>

      {/* Optional: Tooltip hint on first load - desktop only */}
      {!isPlaying && (
        <div
          className={cn(
            "fixed bottom-6 right-22 z-40",
            "bg-card/95 backdrop-blur-sm",
            "px-4 py-2 rounded-full",
            "shadow-soft",
            "text-sm text-muted-foreground",
            "animate-fade-in",
            "hidden md:block"
          )}
        >
          <span className="flex items-center gap-2">
            <Music className="w-4 h-4" />
            Tap to play music
          </span>
        </div>
      )}
    </>
  );
};

export default MusicPlayer;
