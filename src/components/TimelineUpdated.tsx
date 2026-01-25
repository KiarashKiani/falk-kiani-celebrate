import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState, useRef, useId } from "react";

// Reusable wavy border card component
const WavyCard = ({
  children,
  className = "",
  visible = true,
  delay = "0ms"
}: {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
  delay?: string;
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
  return <div className={`relative transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"} ${className}`} style={{
    transitionDelay: visible ? delay : "0ms"
  }}>
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 200" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <clipPath id={clipId}>
            <path d={wavyPath} />
          </clipPath>
        </defs>
        
        <rect x="0" y="0" width="200" height="200" fill="hsl(var(--wedding-sage))" clipPath={`url(#${clipId})`} />
        
        <path d={wavyPath} fill="none" stroke="hsl(var(--wedding-olive))" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      </svg>

      <div className="relative z-10 px-10 py-8 text-center h-full flex flex-col justify-center">
        {children}
      </div>
    </div>;
};
interface TimelineEvent {
  titleKey: string;
  timeKey: string;
  descriptionKey: string;
  delay: string;
}
const Timeline = () => {
  const {
    t
  } = useLanguage();
  const [fridayVisible, setFridayVisible] = useState(false);
  const [saturdayVisible, setSaturdayVisible] = useState(false);
  const fridayRef = useRef<HTMLDivElement>(null);
  const saturdayRef = useRef<HTMLDivElement>(null);
  const fridayEvents: TimelineEvent[] = [{
    titleKey: "timeline.friday.title",
    timeKey: "timeline.friday.time",
    descriptionKey: "timeline.friday.description",
    delay: "0ms"
  }, {
    titleKey: "timeline.friday.bus.title",
    timeKey: "timeline.friday.bus.time",
    descriptionKey: "timeline.friday.bus.description",
    delay: "150ms"
  }];
  const saturdayEvents: TimelineEvent[] = [{
    titleKey: "timeline.saturday.bus.title",
    timeKey: "timeline.saturday.bus.time",
    descriptionKey: "timeline.saturday.bus.description",
    delay: "0ms"
  }, {
    titleKey: "timeline.saturday.mingel.title",
    timeKey: "timeline.saturday.mingel.time",
    descriptionKey: "timeline.saturday.mingel.description",
    delay: "100ms"
  }, {
    titleKey: "timeline.saturday.ceremony.title",
    timeKey: "timeline.saturday.ceremony.time",
    descriptionKey: "timeline.saturday.ceremony.description",
    delay: "200ms"
  }, {
    titleKey: "timeline.saturday.mingel2.title",
    timeKey: "timeline.saturday.mingel2.time",
    descriptionKey: "timeline.saturday.mingel2.description",
    delay: "300ms"
  }, {
    titleKey: "timeline.dinner.title",
    timeKey: "timeline.dinner.time",
    descriptionKey: "timeline.dinner.description",
    delay: "400ms"
  }, {
    titleKey: "timeline.dancing.title",
    timeKey: "timeline.dancing.time",
    descriptionKey: "timeline.dancing.description",
    delay: "500ms"
  }, {
    titleKey: "timeline.saturday.busend.title",
    timeKey: "timeline.saturday.busend.time",
    descriptionKey: "timeline.saturday.busend.description",
    delay: "600ms"
  }];
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px"
    };
    const fridayObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setFridayVisible(true);
        }
      });
    }, observerOptions);
    const saturdayObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setSaturdayVisible(true);
        }
      });
    }, observerOptions);
    if (fridayRef.current) fridayObserver.observe(fridayRef.current);
    if (saturdayRef.current) saturdayObserver.observe(saturdayRef.current);
    return () => {
      fridayObserver.disconnect();
      saturdayObserver.disconnect();
    };
  }, []);

  // Extract display title (removes day prefix if present)
  const getDisplayTitle = (fullTitle: string) => {
    if (fullTitle.includes("-")) {
      return fullTitle.split("-")[1]?.trim() || fullTitle;
    }
    return fullTitle;
  };
  return <section id="timeline" className="py-24 bg-wedding-sage">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="font-script text-4xl md:text-5xl font-bold mb-4" style={{
          color: '#416631'
        }}>
            {t("timeline.title")}
          </h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-wedding-olive to-transparent mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("timeline.subtitle")}
          </p>
        </div>

        {/* Friday Section */}
        <div ref={fridayRef}>
          {/* Friday Header - with decorative lines */}
          <div className={`text-center mb-12 transition-all duration-700 ease-out ${fridayVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="inline-flex items-center gap-6 mb-6">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-wedding-olive"></div>
              <span className="font-serif text-wedding-olive tracking-[0.3em] uppercase text-xl md:text-2xl">
                {t("timeline.friday.title").split(" ")[0] || "Fredag"}
              </span>
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-wedding-olive"></div>
            </div>
          </div>

          {/* Friday - Single centered wavy card */}
          <div className="flex justify-center mb-20">
            <WavyCard visible={fridayVisible} delay="100ms" className="hover:-translate-y-2 transition-transform duration-300 max-w-md w-full min-h-[280px]">
              <h4 className="font-script text-4xl md:text-5xl mb-4" style={{
              color: '#416631'
            }}>
                {getDisplayTitle(t("timeline.friday.title"))}
              </h4>
              <p className="font-serif text-base md:text-lg text-muted-foreground leading-relaxed">
                {t("timeline.friday.description")}
              </p>
            </WavyCard>
          </div>
        </div>

        {/* Saturday Section */}
        <div ref={saturdayRef}>
          {/* Saturday Header */}
          <div className={`text-center mb-12 transition-all duration-700 ease-out ${saturdayVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="inline-flex items-center gap-6 mb-6">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-wedding-olive"></div>
              <span className="font-serif text-wedding-olive tracking-[0.3em] uppercase text-xl md:text-2xl">
                {t("timeline.saturday.day")}
              </span>
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-wedding-olive"></div>
            </div>
          </div>

          {/* Saturday Events Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {saturdayEvents.map((event, index) => <WavyCard key={index} visible={saturdayVisible} delay={event.delay} className="hover:-translate-y-2 transition-transform duration-300">
                <h4 className="font-script text-2xl md:text-3xl text-wedding-olive mb-3">
                  {getDisplayTitle(t(event.titleKey))}
                </h4>
                <p className="font-serif text-lg text-primary mb-4">
                  {t(event.timeKey)}
                </p>
                <p className="font-serif text-muted-foreground text-sm md:text-base leading-relaxed max-w-[280px] mx-auto">
                  {t(event.descriptionKey)}
                </p>
              </WavyCard>)}
          </div>
        </div>
      </div>
    </section>;
};
export default Timeline;