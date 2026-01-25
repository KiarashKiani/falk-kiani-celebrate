import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState, useRef } from "react";

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
}) => (
  <div
    className={`relative transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"} ${className}`}
    style={{ transitionDelay: visible ? delay : "0ms" }}
  >
    {/* Wavy border SVG frame */}
    <svg viewBox="0 0 200 240" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
      <path
        d="M15,25 
           Q25,10 40,25 Q55,40 70,25 Q85,10 100,25 Q115,40 130,25 Q145,10 160,25 Q175,40 185,25
           Q200,40 185,60 Q170,80 185,100 Q200,120 185,140 Q170,160 185,180 Q200,200 185,220
           Q175,235 160,220 Q145,205 130,220 Q115,235 100,220 Q85,205 70,220 Q55,235 40,220 Q25,205 15,220
           Q0,205 15,185 Q30,165 15,145 Q0,125 15,105 Q30,85 15,65 Q0,45 15,25 Z"
        fill="hsl(var(--wedding-sage))"
        stroke="none"
      />
    </svg>

    {/* Content */}
    <div className="relative px-8 pt-14 pb-10 text-center bg-wedding-sage">
      {children}
    </div>
  </div>
);

interface TimelineEvent {
  titleKey: string;
  timeKey: string;
  descriptionKey: string;
  delay: string;
}

const Timeline = () => {
  const { t } = useLanguage();
  const [fridayVisible, setFridayVisible] = useState(false);
  const [saturdayVisible, setSaturdayVisible] = useState(false);
  const fridayRef = useRef<HTMLDivElement>(null);
  const saturdayRef = useRef<HTMLDivElement>(null);

  const fridayEvents: TimelineEvent[] = [
    {
      titleKey: "timeline.friday.title",
      timeKey: "timeline.friday.time",
      descriptionKey: "timeline.friday.description",
      delay: "0ms"
    },
    {
      titleKey: "timeline.friday.bus.title",
      timeKey: "timeline.friday.bus.time",
      descriptionKey: "timeline.friday.bus.description",
      delay: "150ms"
    }
  ];

  const saturdayEvents: TimelineEvent[] = [
    {
      titleKey: "timeline.saturday.bus.title",
      timeKey: "timeline.saturday.bus.time",
      descriptionKey: "timeline.saturday.bus.description",
      delay: "0ms"
    },
    {
      titleKey: "timeline.saturday.mingel.title",
      timeKey: "timeline.saturday.mingel.time",
      descriptionKey: "timeline.saturday.mingel.description",
      delay: "100ms"
    },
    {
      titleKey: "timeline.saturday.ceremony.title",
      timeKey: "timeline.saturday.ceremony.time",
      descriptionKey: "timeline.saturday.ceremony.description",
      delay: "200ms"
    },
    {
      titleKey: "timeline.saturday.mingel2.title",
      timeKey: "timeline.saturday.mingel2.time",
      descriptionKey: "timeline.saturday.mingel2.description",
      delay: "300ms"
    },
    {
      titleKey: "timeline.dinner.title",
      timeKey: "timeline.dinner.time",
      descriptionKey: "timeline.dinner.description",
      delay: "400ms"
    },
    {
      titleKey: "timeline.dancing.title",
      timeKey: "timeline.dancing.time",
      descriptionKey: "timeline.dancing.description",
      delay: "500ms"
    },
    {
      titleKey: "timeline.saturday.busend.title",
      timeKey: "timeline.saturday.busend.time",
      descriptionKey: "timeline.saturday.busend.description",
      delay: "600ms"
    }
  ];

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px"
    };

    const fridayObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setFridayVisible(true);
        }
      });
    }, observerOptions);

    const saturdayObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
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

  return (
    <section id="timeline" className="py-24 bg-wedding-sage">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="font-script text-4xl md:text-5xl font-bold text-primary mb-4">
            {t("timeline.title")}
          </h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-wedding-olive to-transparent mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("timeline.subtitle")}
          </p>
        </div>

        {/* Friday Section */}
        <div ref={fridayRef}>
          {/* Friday Header */}
          <div
            className={`text-center mb-12 transition-all duration-700 ease-out ${
              fridayVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="inline-flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-wedding-olive"></div>
              <span className="font-serif text-wedding-olive tracking-[0.3em] uppercase text-sm">
                {t("timeline.friday.title").split(" ")[0] || "Fredag"}
              </span>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-wedding-olive"></div>
            </div>
          </div>

          {/* Friday Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6 mb-20 max-w-2xl mx-auto">
            {fridayEvents.map((event, index) => (
              <WavyCard
                key={index}
                visible={fridayVisible}
                delay={event.delay}
                className="hover:-translate-y-2 transition-transform duration-300"
              >
                <h3 className="font-script text-3xl md:text-4xl text-wedding-olive mb-3">
                  {getDisplayTitle(t(event.titleKey))}
                </h3>
                <p className="font-serif text-lg text-primary mb-4">
                  {t(event.timeKey)}
                </p>
                <p className="font-serif text-muted-foreground text-sm md:text-base leading-relaxed max-w-[280px] mx-auto">
                  {t(event.descriptionKey)}
                </p>
              </WavyCard>
            ))}
          </div>
        </div>

        {/* Saturday Section */}
        <div ref={saturdayRef}>
          {/* Saturday Header */}
          <div
            className={`text-center mb-12 transition-all duration-700 ease-out ${
              saturdayVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="inline-flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-wedding-olive"></div>
              <span className="font-serif text-wedding-olive tracking-[0.3em] uppercase text-sm">
                {t("timeline.saturday.ceremony.title").split(" ")[0] === t("timeline.saturday.ceremony.title")
                  ? "Lördag"
                  : "Lördag"}
              </span>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-wedding-olive"></div>
            </div>
          </div>

          {/* Saturday Events Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {saturdayEvents.map((event, index) => (
              <WavyCard
                key={index}
                visible={saturdayVisible}
                delay={event.delay}
                className="hover:-translate-y-2 transition-transform duration-300"
              >
                <h4 className="font-script text-2xl md:text-3xl text-wedding-olive mb-3">
                  {getDisplayTitle(t(event.titleKey))}
                </h4>
                <p className="font-serif text-lg text-primary mb-4">
                  {t(event.timeKey)}
                </p>
                <p className="font-serif text-muted-foreground text-sm md:text-base leading-relaxed max-w-[280px] mx-auto">
                  {t(event.descriptionKey)}
                </p>
              </WavyCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
