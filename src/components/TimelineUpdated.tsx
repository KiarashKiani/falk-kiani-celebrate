import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState, useRef, useId } from "react";

// Wavy border card with customizable border color
const WavyCard = ({
  children,
  className = "",
  visible = true,
  delay = "0ms",
  borderColor = "hsl(var(--wedding-olive))"
}: {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
  delay?: string;
  borderColor?: string;
}) => {
  const clipId = useId();
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
      className={`relative transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"} ${className}`}
      style={{ transitionDelay: visible ? delay : "0ms" }}
    >
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
        <rect x="0" y="0" width="200" height="200" fill="#fff9f1" clipPath={`url(#${clipId})`} />
        <path
          d={wavyPath}
          fill="none"
          stroke={borderColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="relative z-10 px-8 py-10 text-center h-full flex flex-col justify-center">
        {children}
      </div>
    </div>
  );
};

// Title with "och" in script font
const TwoPartTitle = ({ 
  part1, 
  part2, 
  color = "#416631" 
}: { 
  part1: string; 
  part2: string; 
  color?: string;
}) => (
  <div className="mb-4">
    <span 
      className="block font-serif text-xl md:text-2xl uppercase tracking-[0.15em] font-light"
      style={{ color }}
    >
      {part1}
    </span>
    <div className="flex items-center justify-center gap-2">
      <span 
        className="font-brittany text-2xl md:text-3xl italic"
        style={{ color }}
      >
        och
      </span>
      <span 
        className="font-serif text-2xl md:text-3xl uppercase tracking-[0.1em] font-light"
        style={{ color }}
      >
        {part2}
      </span>
    </div>
  </div>
);

const Timeline = () => {
  const { t } = useLanguage();
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

  return (
    <section id="timeline" className="py-24" style={{ backgroundColor: '#fff9f1' }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2
            className="text-3xl md:text-4xl font-normal mb-4 uppercase tracking-wider"
            style={{ fontFamily: "'Lovely May', serif", color: '#ff8a00' }}
          >
            {t("timeline.header") || "Info"}
          </h2>
          <p className="font-serif text-lg max-w-2xl mx-auto tracking-wide" style={{ color: '#416631' }}>
            {t("timeline.subtitle")}
          </p>
        </div>

        {/* Friday Section */}
        <div ref={fridayRef}>
          <div className="flex justify-center mb-20">
            <WavyCard 
              visible={fridayVisible} 
              delay="100ms" 
              borderColor="#416631"
              className="hover:-translate-y-2 transition-transform duration-300 max-w-lg w-full min-h-[320px]"
            >
              <h3
                className="font-serif text-base mb-1 uppercase tracking-wider"
                style={{ color: '#416631' }}
              >
                {t("timeline.friday.day") || "Fredag"}
              </h3>
              <h4
                className="font-brittany text-3xl md:text-4xl mb-6"
                style={{ color: '#416631' }}
              >
                {t("timeline.friday.event") || "välkomstmingel"}
              </h4>
              <div
                className="font-serif text-base text-left space-y-1 tracking-wide"
                style={{ color: '#416631' }}
              >
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
          {/* Saturday Header - Script font like reference */}
          <div className={`text-center mb-12 transition-all duration-700 ease-out ${saturdayVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h3
              className="font-brittany text-4xl md:text-5xl"
              style={{ color: '#416631' }}
            >
              {t("timeline.saturday.day") || "Lördag"}
            </h3>
          </div>

          {/* Saturday Events - 3 cards matching reference */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Välkomstdrink och Vigsel - Dark olive border */}
            <WavyCard
              visible={saturdayVisible}
              delay="100ms"
              borderColor="#416631"
              className="hover:-translate-y-2 transition-transform duration-300 min-h-[280px]"
            >
              <TwoPartTitle part1="VÄLKOMSTDRINK" part2="VIGSEL" color="#416631" />
              <p className="font-serif text-sm tracking-wide" style={{ color: '#416631' }}>
                {t("timeline.saturday.ceremony.description") || "Bussar avgår från Västerås"}
              </p>
            </WavyCard>

            {/* Card 2: Middag och Fest - Sage green border */}
            <WavyCard
              visible={saturdayVisible}
              delay="200ms"
              borderColor="#7a9a6d"
              className="hover:-translate-y-2 transition-transform duration-300 min-h-[280px]"
            >
              <TwoPartTitle part1="MIDDAG" part2="FEST" color="#416631" />
              <p className="font-serif text-sm tracking-wide" style={{ color: '#416631' }}>
                {t("timeline.dinner.description") || "Middagen serveras i den vackra trädgården på Nybynäsgård."}
              </p>
            </WavyCard>

            {/* Card 3: Drinkar och Dans - Orange border */}
            <WavyCard
              visible={saturdayVisible}
              delay="300ms"
              borderColor="#d4914a"
              className="hover:-translate-y-2 transition-transform duration-300 min-h-[280px]"
            >
              <TwoPartTitle part1="DRINKAR" part2="DANS" color="#d4914a" />
              <p className="font-serif text-sm tracking-wide" style={{ color: '#416631' }}>
                {t("timeline.dancing.description") || "Dansa natten lång!"}
              </p>
            </WavyCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;