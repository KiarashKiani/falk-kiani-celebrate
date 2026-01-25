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
  
  // Gentler, more uniform wavy path matching original design
  const wavyPath = `
    M 15,8
    C 25,5 35,11 50,8 C 65,5 75,11 90,8 C 105,5 115,11 130,8 C 145,5 155,11 170,8 C 180,6 188,10 192,15
    C 195,25 189,35 192,50 C 195,65 189,75 192,90 C 195,105 189,115 192,130 C 195,145 189,155 192,170 C 194,180 190,188 185,192
    C 175,195 165,189 150,192 C 135,195 125,189 110,192 C 95,195 85,189 70,192 C 55,195 45,189 30,192 C 20,194 12,190 8,185
    C 5,175 11,165 8,150 C 5,135 11,125 8,110 C 5,95 11,85 8,70 C 5,55 11,45 8,30 C 6,20 10,12 15,8
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
        
        {/* White fill */}
        <rect 
          x="0" 
          y="0" 
          width="200" 
          height="200" 
          fill="white"
          clipPath={`url(#${clipId})`}
        />
        
        {/* Wavy border stroke - refined weight */}
        <path
          d={wavyPath}
          fill="none"
          stroke="hsl(var(--wedding-olive))"
          strokeWidth="1.2"
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
