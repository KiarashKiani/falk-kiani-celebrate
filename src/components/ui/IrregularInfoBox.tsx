import { ReactNode, useId } from "react";

interface IrregularInfoBoxProps {
  children: ReactNode;
  className?: string;
}

const IrregularInfoBox = ({ children, className = "" }: IrregularInfoBoxProps) => {
  const clipId = useId();
  
  // Irregular organic blob shape
  const blobPath = `
    M 5,15
    C 8,5 20,2 35,5 C 50,2 65,8 80,4 C 90,2 97,8 98,18
    C 100,35 95,50 98,65 C 100,80 96,90 92,95
    C 80,100 65,96 50,98 C 35,100 20,95 10,98 C 3,100 0,92 2,80
    C 0,65 5,50 2,35 C 0,20 2,10 5,15
    Z
  `;

  return (
    <div className={`relative ${className}`}>
      <svg
        className="absolute -inset-3 pointer-events-none"
        style={{ width: 'calc(100% + 24px)', height: 'calc(100% + 24px)' }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <clipPath id={clipId}>
            <path d={blobPath} />
          </clipPath>
        </defs>
        <path
          d={blobPath}
          fill="#fffeb8"
        />
      </svg>
      <div className="relative z-10 p-5">
        {children}
      </div>
    </div>
  );
};

export default IrregularInfoBox;
