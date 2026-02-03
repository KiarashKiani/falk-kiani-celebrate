import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState, useRef, useId } from "react";
import handsIllustration from "@/assets/hands-illustration.png";
import cocktailIllustration from "@/assets/cocktail-illustration.png";
import wavyFrameSvg from "@/assets/wavy-frame.svg";

// More organic, hand-drawn wavy paths for each card position
const wavyPaths = {
  // Card 1: Large organic waves like the reference
  card1: `
    M 20,25
    C 10,15 25,5 45,12 C 65,19 75,3 95,10 C 115,17 130,2 150,8 C 170,14 185,5 195,20
    C 200,35 195,55 198,75 C 201,95 193,115 197,135 C 201,155 194,175 190,190
    C 175,198 155,192 135,197 C 115,202 95,190 75,196 C 55,202 35,193 20,185
    C 5,170 12,150 6,130 C 0,110 10,90 5,70 C 0,50 8,35 20,25
    Z
  `,
  // Card 2: Different wave pattern
  card2: `
    M 14,10
    C 30,4 48,14 66,8 C 84,2 100,15 118,10 C 136,5 152,16 170,12 C 184,8 194,18 198,32
    C 202,50 192,68 197,86 C 202,104 190,122 196,140 C 202,158 192,174 186,188
    C 172,196 154,188 136,194 C 118,200 100,186 82,193 C 64,200 46,184 28,191 C 14,196 4,184 2,168
    C -2,150 10,132 4,114 C -2,96 8,78 3,60 C -2,42 6,24 14,10
    Z
  `,
  // Card 3: Another unique variation
  card3: `
    M 20,8
    C 38,2 54,16 72,10 C 90,4 108,18 126,12 C 144,6 162,14 180,10 C 192,6 200,20 198,36
    C 196,56 186,72 192,92 C 198,112 186,130 193,150 C 200,170 188,186 178,194
    C 160,200 142,188 124,196 C 106,204 88,186 70,194 C 52,202 34,188 18,194 C 6,198 -2,182 2,164
    C 6,144 16,126 8,108 C 0,90 12,72 6,54 C 0,36 10,18 20,8
    Z
  `
};

// Softer, more muted color palette
const colors = {
  darkOlive: "#4a5c3d",
  // Desaturated dark olive
  sageGreen: "#8fa882",
  // Softer sage
  mutedOrange: "#c49a6c",
  // Warmer, muted orange
  textOlive: "#5a6b4d",
  // Softer text color
  cream: "#fff9f1" // Warm peachy cream
};

// Wavy border card with organic, hand-drawn feel
const WavyCard = ({
  children,
  className = "",
  visible = true,
  delay = "0ms",
  borderColor = colors.darkOlive,
  illustration,
  illustrationPosition = "bottom-right",
  wavyPath = wavyPaths.card1,
  useCustomFrame = false
}: {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
  delay?: string;
  borderColor?: string;
  illustration?: string;
  illustrationPosition?: "bottom-right" | "bottom-left" | "top-right";
  wavyPath?: string;
  useCustomFrame?: boolean;
}) => {
  const clipId = useId();
  const positionClasses = {
    "bottom-right": "bottom-8 right-6",
    "bottom-left": "bottom-8 left-6",
    "top-right": "top-6 right-6"
  };
  
  return <div className={`relative transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"} ${className}`} style={{
    transitionDelay: visible ? delay : "0ms"
  }}>
      {useCustomFrame ? (
        <img 
          src={wavyFrameSvg} 
          alt="" 
          className="absolute inset-0 w-full h-full pointer-events-none" 
          style={{ transform: 'rotate(90deg) scale(1.7)', transformOrigin: 'center center' }}
          aria-hidden="true" 
        />
      ) : (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 200" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <clipPath id={clipId}>
              <path d={wavyPath} />
            </clipPath>
          </defs>
          <rect x="0" y="0" width="200" height="200" fill={colors.cream} clipPath={`url(#${clipId})`} />
          <path d={wavyPath} fill="none" stroke={borderColor} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        </svg>
      )}
      {/* More padding, centered content with breathing room */}
      <div className={`relative z-10 py-12 h-full flex flex-col ${useCustomFrame ? 'px-16 pl-20' : 'px-10'}`}>
        {children}
      </div>
      {illustration && <img src={illustration} alt="" className={`absolute ${positionClasses[illustrationPosition]} w-24 h-24 md:w-28 md:h-28 object-contain z-0 pointer-events-none opacity-25`} aria-hidden="true" />}
    </div>;
};

// Title with delicate "och" script - matching reference exactly
const TwoPartTitle = ({
  part1,
  part2,
  color = colors.textOlive
}: {
  part1: string;
  part2: string;
  color?: string;
}) => <div className="mb-8">
    <span className="block font-serif text-xs md:text-sm uppercase tracking-[0.35em] font-extralight" style={{
    color,
    opacity: 0.85
  }}>
      {part1}
    </span>
    <div className="flex items-baseline gap-1 mt-0.5">
      <span className="font-brittany text-2xl md:text-3xl font-light" style={{
      color,
      opacity: 0.7
    }}>
        och
      </span>
      <span className="font-serif text-4xl md:text-5xl uppercase tracking-[0.04em] font-light" style={{
      color
    }}>
        {part2}
      </span>
    </div>
  </div>;
const Timeline = () => {
  const {
    t
  } = useLanguage();
  const [fridayVisible, setFridayVisible] = useState(false);
  const [saturdayVisible, setSaturdayVisible] = useState(false);
  const fridayRef = useRef<HTMLDivElement>(null);
  const saturdayRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px"
    };
    const fridayObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setFridayVisible(true);
      });
    }, observerOptions);
    const saturdayObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setSaturdayVisible(true);
      });
    }, observerOptions);
    if (fridayRef.current) fridayObserver.observe(fridayRef.current);
    if (saturdayRef.current) saturdayObserver.observe(saturdayRef.current);
    return () => {
      fridayObserver.disconnect();
      saturdayObserver.disconnect();
    };
  }, []);
  return <section id="timeline" className="pt-12 pb-28" style={{
    backgroundColor: colors.cream
  }}>
      <div className="max-w-6xl mx-auto px-6 border-[#fff8f0]">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-normal mb-3 tracking-wide" style={{
          fontFamily: "'Brittany', cursive",
          color: '#ff8a00'
        }}>
            {t("timeline.header") || "Bröllopshelgen"}
          </h2>
        </div>

        {/* Friday Section */}
        <div ref={fridayRef}>
          <div className="flex justify-center mb-24">
            <WavyCard visible={fridayVisible} delay="100ms" borderColor={colors.darkOlive} wavyPath={wavyPaths.card1} useCustomFrame={true} className="hover:-translate-y-1 transition-transform duration-500 max-w-lg w-full min-h-[320px]">
              <h3 className="font-lovely-may text-4xl md:text-5xl text-left mb-1 uppercase tracking-wide" style={{
                color: colors.textOlive,
                fontWeight: 400
              }}>
                {t("timeline.friday.day") || "FREDAG"}
              </h3>
              <h4 className="font-brittany-heading text-3xl md:text-4xl mb-6 text-left pl-8" style={{
                color: colors.textOlive
              }}>
                välkomstmingel
              </h4>
              <div className="font-serif text-sm space-y-2 tracking-wide leading-relaxed" style={{
              color: colors.textOlive
            }}>
                <p>{t("timeline.friday.time") || "Från 18:00"}</p>
                <p>{t("timeline.friday.location") || "Vi samlas på Nybynäs Gård"}</p>
                <p>{t("timeline.friday.food") || "Mat och dryck serveras."}</p>
                <p>{t("timeline.friday.end") || "Kvällen avslutas med bussar tillbaka till Västerås."}</p>
              </div>
            </WavyCard>
          </div>
        </div>

        {/* Saturday Section */}
        <div ref={saturdayRef}>
          <div className={`text-center mb-14 transition-all duration-700 ease-out ${saturdayVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h3 className="font-brittany text-4xl md:text-5xl" style={{
            color: colors.textOlive
          }}>
              {t("timeline.saturday.day") || "Lördag"}
            </h3>
          </div>

          {/* Saturday Events - 3 cards with unique wavy borders */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Card 1: Välkomstdrink och Vigsel */}
            <WavyCard visible={saturdayVisible} delay="100ms" borderColor={colors.darkOlive} wavyPath={wavyPaths.card1} useCustomFrame={true} className="hover:-translate-y-1 transition-transform duration-500 min-h-[320px]" illustration={handsIllustration} illustrationPosition="bottom-right">
              <TwoPartTitle part1="VÄLKOMSTDRINK" part2="VIGSEL" color={colors.darkOlive} />
              <p className="font-serif text-sm tracking-wide mt-auto leading-relaxed" style={{
              color: colors.textOlive
            }}>
                {t("timeline.saturday.ceremony.description") || "Bussar avgår från Västerås"}
              </p>
            </WavyCard>

            {/* Card 2: Middag och Fest */}
            <WavyCard visible={saturdayVisible} delay="200ms" borderColor={colors.sageGreen} wavyPath={wavyPaths.card2} useCustomFrame={true} className="hover:-translate-y-1 transition-transform duration-500 min-h-[320px]">
              <TwoPartTitle part1="MIDDAG" part2="FEST" color={colors.sageGreen} />
              <p className="font-serif text-sm tracking-wide mt-auto leading-relaxed" style={{
              color: colors.textOlive
            }}>
                {t("timeline.dinner.description") || "Middagen serveras i den vackra trädgården på Nybynäsgård."}
              </p>
            </WavyCard>

            {/* Card 3: Drinkar och Dans */}
            <WavyCard visible={saturdayVisible} delay="300ms" borderColor={colors.mutedOrange} wavyPath={wavyPaths.card3} useCustomFrame={true} className="hover:-translate-y-1 transition-transform duration-500 min-h-[320px]" illustration={cocktailIllustration} illustrationPosition="top-right">
              <TwoPartTitle part1="DRINKAR" part2="DANS" color={colors.mutedOrange} />
              <p className="font-serif text-sm tracking-wide mt-auto leading-relaxed" style={{
              color: colors.textOlive
            }}>
                {t("timeline.dancing.description") || "Dansa natten lång!"}
              </p>
            </WavyCard>
          </div>
        </div>
      </div>
    </section>;
};
export default Timeline;