import { ReactNode, useId } from "react";

interface WavyBorderCardProps {
  children: ReactNode;
  className?: string;
  visible?: boolean;
  delay?: string;
}

const WavyBorderCard = ({
  children,
  className = "",
  visible = true,
  delay = "0ms"
}: WavyBorderCardProps) => {
  const clipId = useId();
  
  // More pronounced wavy path matching Friday card design
  const wavyPath = `
    M 20,12
    C 35,4 45,18 60,10 C 75,2 85,20 100,12 C 115,4 125,18 140,10 C 155,2 165,16 180,10 C 190,6 198,18 198,30
    C 198,45 188,55 196,70 C 204,85 188,100 196,115 C 204,130 188,145 196,160 C 200,175 190,190 178,196
    C 163,202 150,188 135,196 C 120,204 105,188 90,196 C 75,204 60,188 45,196 C 30,204 18,192 10,180
    C 2,165 14,150 6,135 C -2,120 12,105 4,90 C -4,75 10,60 4,45 C -2,30 10,18 20,12
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
          stroke="hsl(var(--wedding-olive))"
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
