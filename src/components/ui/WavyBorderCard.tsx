import { ReactNode, useId } from "react";

interface WavyBorderCardProps {
  children: ReactNode;
  className?: string;
  visible?: boolean;
  delay?: string;
  borderColor?: string;
}

const WavyBorderCard = ({
  children,
  className = "",
  visible = true,
  delay = "0ms",
  borderColor
}: WavyBorderCardProps) => {
  const clipId = useId();
  
  // More square wavy path with subtle waves matching Friday card
  const wavyPath = `
    M 12,6
    C 30,2 50,10 70,6 C 90,2 110,10 130,6 C 150,2 170,10 188,6 C 196,4 200,12 200,20
    C 200,40 192,55 198,75 C 204,95 192,115 198,135 C 204,155 192,175 198,188 C 200,196 192,200 180,200
    C 160,200 140,192 120,198 C 100,204 80,192 60,198 C 40,204 20,192 12,198 C 4,200 0,192 0,180
    C 0,160 8,140 2,120 C -4,100 8,80 2,60 C -4,40 8,20 2,12 C 0,4 4,0 12,6
    Z
  `;

  return (
    <div
      className={`relative transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
      style={{ transitionDelay: visible ? delay : "0ms" }}
    >
      {/* SVG Wavy Border */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 200 200"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <clipPath id={clipId}>
            <path d={wavyPath} />
          </clipPath>
        </defs>
        
        {/* Peach fill */}
        <rect 
          x="0" 
          y="0" 
          width="200" 
          height="200" 
          fill="hsl(var(--wedding-sage))"
          clipPath={`url(#${clipId})`}
        />
        
        {/* Wavy border stroke - refined weight */}
        <path
          d={wavyPath}
          fill="none"
          stroke={borderColor || "hsl(var(--wedding-olive))"}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Content */}
      <div className="relative z-10 px-10 py-8 text-center h-full flex flex-col justify-center">
        {children}
      </div>
    </div>
  );
};

export default WavyBorderCard;
