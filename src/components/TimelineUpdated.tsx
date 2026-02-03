import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState, useRef, useId } from "react";
import handsIllustration from "@/assets/hands-illustration.png";
import cocktailIllustration from "@/assets/cocktail-illustration.png";

// More organic, hand-drawn wavy paths with pronounced curves matching reference
const wavyPaths = {
  // Card 1: Pronounced wavy border like reference image
  card1: `
    M 20,12
    C 35,4 45,18 60,10 C 75,2 85,20 100,12 C 115,4 125,18 140,10 C 155,2 165,16 180,10 C 190,6 198,18 198,30
    C 198,45 188,55 196,70 C 204,85 188,100 196,115 C 204,130 188,145 196,160 C 200,175 190,190 178,196
    C 163,202 150,188 135,196 C 120,204 105,188 90,196 C 75,204 60,188 45,196 C 30,204 18,192 10,180
    C 2,165 14,150 6,135 C -2,120 12,105 4,90 C -4,75 10,60 4,45 C -2,30 10,18 20,12
    Z
  `,
  // Card 2: Different wave pattern
  card2: `
    M 18,14
    C 33,4 48,20 65,10 C 82,0 95,18 112,10 C 129,2 145,18 162,10 C 178,2 192,16 198,32
    C 204,50 190,65 198,82 C 206,99 190,115 198,132 C 206,149 192,168 182,184
    C 168,196 150,184 132,194 C 114,204 96,186 78,196 C 60,206 42,186 24,194 C 10,200 0,184 2,166
    C 4,148 16,132 6,114 C -4,96 10,78 4,60 C -2,42 10,26 18,14
    Z
  `,
  // Card 3: Another unique variation
  card3: `
    M 22,10
    C 40,0 55,20 72,10 C 89,0 105,20 122,10 C 139,0 158,18 175,10 C 190,4 200,22 198,40
    C 196,60 184,75 194,95 C 204,115 186,135 196,155 C 204,172 190,190 174,196
    C 156,204 138,186 120,196 C 102,206 84,186 66,196 C 48,206 30,186 14,194 C 2,200 -4,182 4,162
    C 12,142 20,125 10,105 C 0,85 14,68 6,50 C -2,32 12,16 22,10
    Z
  `
};

// Softer, more muted color palette
const colors = {
  darkOlive: "#3f5f10",
  // Frame/och color for first card
  darkOliveText: "#1b2e00",
  // Text color for first card
  sageGreen: "#89b647",
  // Frame/och color for middle card
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
  wavyPath = wavyPaths.card1
}: {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
  delay?: string;
  borderColor?: string;
  illustration?: string;
  illustrationPosition?: "bottom-right" | "bottom-left" | "top-right";
  wavyPath?: string;
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
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 200" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <clipPath id={clipId}>
            <path d={wavyPath} />
          </clipPath>
        </defs>
        <rect x="0" y="0" width="200" height="200" fill={colors.cream} clipPath={`url(#${clipId})`} />
        <path d={wavyPath} fill="none" stroke={borderColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      </svg>
      {/* More padding, centered content with breathing room */}
      <div className="relative z-10 px-10 py-12 h-full flex flex-col">
        {children}
      </div>
      {illustration && <img src={illustration} alt="" className={`absolute ${positionClasses[illustrationPosition]} w-24 h-24 md:w-28 md:h-28 object-contain z-0 pointer-events-none opacity-25`} aria-hidden="true" />}
    </div>;
};

// Title with delicate "och" script - matching reference exactly
const TwoPartTitle = ({
  part1,
  part2,
  color = colors.textOlive,
  ochColor
}: {
  part1: string;
  part2: string;
  color?: string;
  ochColor?: string;
}) => <div className="mb-8">
    <span className="block font-serif text-xs md:text-sm uppercase tracking-[0.35em] font-extralight" style={{
    color,
    opacity: 0.85
  }}>
      {part1}
    </span>
    <div className="flex items-baseline gap-1 mt-0.5">
      <span className="font-brittany text-2xl md:text-3xl font-light" style={{
      color: ochColor || color,
      opacity: 0.85
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
            <WavyCard visible={fridayVisible} delay="100ms" borderColor={colors.darkOlive} wavyPath={wavyPaths.card1} className="hover:-translate-y-1 transition-transform duration-500 max-w-lg w-full min-h-[320px]">
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
            <WavyCard visible={saturdayVisible} delay="100ms" borderColor={colors.darkOlive} wavyPath={wavyPaths.card1} className="hover:-translate-y-1 transition-transform duration-500 min-h-[320px]" illustration={handsIllustration} illustrationPosition="bottom-right">
              <TwoPartTitle part1="VÄLKOMSTDRINK" part2="VIGSEL" color={colors.darkOliveText} ochColor={colors.darkOlive} />
              <p className="font-serif text-sm tracking-wide mt-auto leading-relaxed" style={{
              color: colors.darkOliveText
            }}>
                {t("timeline.saturday.ceremony.description") || "Bussar avgår från Västerås"}
              </p>
            </WavyCard>

            {/* Card 2: Middag och Fest */}
            <WavyCard visible={saturdayVisible} delay="200ms" borderColor={colors.sageGreen} wavyPath={wavyPaths.card2} className="hover:-translate-y-1 transition-transform duration-500 min-h-[320px]">
              <TwoPartTitle part1="MIDDAG" part2="FEST" color={colors.darkOliveText} ochColor={colors.sageGreen} />
              <p className="font-serif text-sm tracking-wide mt-auto leading-relaxed" style={{
              color: colors.darkOliveText
            }}>
                {t("timeline.dinner.description") || "Middagen serveras i den vackra trädgården på Nybynäsgård."}
              </p>
            </WavyCard>

            {/* Card 3: Drinkar och Dans */}
            <WavyCard visible={saturdayVisible} delay="300ms" borderColor={colors.mutedOrange} wavyPath={wavyPaths.card3} className="hover:-translate-y-1 transition-transform duration-500 min-h-[320px]" illustration={cocktailIllustration} illustrationPosition="top-right">
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