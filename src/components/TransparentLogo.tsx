import { useEffect, useState } from "react";

interface TransparentLogoProps {
  src: string;
  alt?: string;
  className?: string;
  /**
   * Threshold for considering a pixel as background (0-255).
   * Higher = more pixels become transparent. Default 240.
   */
  tolerance?: number;
}

/**
 * Makes near-white/very light background pixels transparent using a simple chroma key.
 * Works well for black logos on white backgrounds or light checkerboards.
 */
const TransparentLogo = ({ src, alt, className, tolerance = 240 }: TransparentLogoProps) => {
  const [processedSrc, setProcessedSrc] = useState<string | null>(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        // Identify near-white/very light neutral pixels (to also catch light checkerboards)
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const isLight = max >= tolerance; // very bright
        const isNeutral = max - min < 24; // low saturation (nearly gray/white)
        if (isLight && isNeutral) {
          data[i + 3] = 0; // make transparent
        }
      }

      ctx.putImageData(imageData, 0, 0);
      const url = canvas.toDataURL("image/png");
      setProcessedSrc(url);
    };
  }, [src, tolerance]);

  return <img src={processedSrc ?? src} alt={alt} className={className} />;
};

export default TransparentLogo;
