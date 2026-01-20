import { ReactNode } from "react";

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
}: WavyBorderCardProps) => (
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
        <clipPath id="wavyClip">
          <path d="
            M 10,20
            Q 20,10 30,15 Q 40,20 50,12 Q 60,4 70,12 Q 80,20 90,12 Q 100,4 110,12 Q 120,20 130,12 Q 140,4 150,12 Q 160,20 170,12 Q 180,4 190,15 Q 200,26 190,30
            Q 200,40 195,50 Q 190,60 198,70 Q 206,80 195,90 Q 184,100 195,110 Q 206,120 195,130 Q 184,140 195,150 Q 206,160 195,170 Q 184,180 190,185 Q 196,190 185,195
            Q 180,200 170,188 Q 160,176 150,188 Q 140,200 130,188 Q 120,176 110,188 Q 100,200 90,188 Q 80,176 70,188 Q 60,200 50,188 Q 40,176 30,188 Q 20,200 10,190 Q 0,180 5,170
            Q 10,160 2,150 Q -6,140 5,130 Q 16,120 5,110 Q -6,100 5,90 Q 16,80 5,70 Q -6,60 5,50 Q 16,40 5,30 Q -6,20 10,20
            Z
          " />
        </clipPath>
      </defs>
      
      {/* White fill */}
      <rect 
        x="0" 
        y="0" 
        width="200" 
        height="200" 
        fill="white"
        clipPath="url(#wavyClip)"
      />
      
      {/* Wavy border stroke */}
      <path
        d="
          M 10,20
          Q 20,10 30,15 Q 40,20 50,12 Q 60,4 70,12 Q 80,20 90,12 Q 100,4 110,12 Q 120,20 130,12 Q 140,4 150,12 Q 160,20 170,12 Q 180,4 190,15 Q 200,26 190,30
          Q 200,40 195,50 Q 190,60 198,70 Q 206,80 195,90 Q 184,100 195,110 Q 206,120 195,130 Q 184,140 195,150 Q 206,160 195,170 Q 184,180 190,185 Q 196,190 185,195
          Q 180,200 170,188 Q 160,176 150,188 Q 140,200 130,188 Q 120,176 110,188 Q 100,200 90,188 Q 80,176 70,188 Q 60,200 50,188 Q 40,176 30,188 Q 20,200 10,190 Q 0,180 5,170
          Q 10,160 2,150 Q -6,140 5,130 Q 16,120 5,110 Q -6,100 5,90 Q 16,80 5,70 Q -6,60 5,50 Q 16,40 5,30 Q -6,20 10,20
          Z
        "
        fill="none"
        stroke="hsl(var(--wedding-olive))"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>

    {/* Content */}
    <div className="relative z-10 px-8 py-6 text-center h-full flex flex-col justify-center">
      {children}
    </div>
  </div>
);

export default WavyBorderCard;
