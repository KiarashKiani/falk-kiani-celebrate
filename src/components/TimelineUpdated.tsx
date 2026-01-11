import { Clock, Heart, Music } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState, useRef } from "react";

const Timeline = () => {
  const { t } = useLanguage();
  const [fridayVisible, setFridayVisible] = useState(false);
  const [saturdayVisible, setSaturdayVisible] = useState(false);
  const fridayRef = useRef<HTMLDivElement>(null);
  const saturdayRef = useRef<HTMLDivElement>(null);

  const saturdayEvents = [
    {
      title: t("timeline.saturday.title"),
      time: t("timeline.saturday.time"),
      description: t("timeline.saturday.description"),
      icon: Heart,
      color: "bg-gradient-to-br from-wedding-gold/20 to-wedding-blush/30",
      iconColor: "text-wedding-gold",
      delay: "0ms"
    },
    {
      title: t("timeline.dinner.title"),
      time: t("timeline.dinner.time"),
      description: t("timeline.dinner.description"),
      icon: Clock,
      color: "bg-gradient-to-br from-wedding-blush/20 to-wedding-sage/30",
      iconColor: "text-primary",
      delay: "100ms"
    },
    {
      title: t("timeline.dancing.title"),
      time: t("timeline.dancing.time"),
      description: t("timeline.dancing.description"),
      icon: Music,
      color: "bg-gradient-to-br from-wedding-sage/20 to-wedding-cream/40",
      iconColor: "text-wedding-olive",
      delay: "200ms"
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

  return (
    <section id="timeline" className="py-20 bg-wedding-sage">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-script text-4xl md:text-5xl font-bold text-primary mb-4">
            {t("timeline.title")}
          </h2>
          <div className="w-24 h-px bg-primary mx-auto mb-6"></div>
          <p className="font-serif text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("timeline.subtitle")}
          </p>
        </div>

        {/* Friday Section - Calm & Minimal */}
        <div 
          ref={fridayRef}
          className={`mb-20 transition-all duration-1000 ease-out ${
            fridayVisible 
              ? "opacity-100 translate-y-0 scale-100" 
              : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          <div className="flex justify-center">
            <div className="relative w-full max-w-lg">
              {/* Decorative wavy border frame */}
              <div className="absolute inset-0 -m-4">
                <svg
                  viewBox="0 0 400 280"
                  className="w-full h-full"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M30,35 
                       Q50,15 70,35 Q90,55 110,35 Q130,15 150,35 Q170,55 190,35 Q210,15 230,35 Q250,55 270,35 Q290,15 310,35 Q330,55 350,35 Q370,15 385,35
                       Q400,55 385,80 Q370,105 385,130 Q400,155 385,180 Q370,205 385,230 Q400,255 385,270
                       Q370,285 350,265 Q330,245 310,265 Q290,285 270,265 Q250,245 230,265 Q210,285 190,265 Q170,245 150,265 Q130,285 110,265 Q90,245 70,265 Q50,285 30,265
                       Q15,245 30,220 Q45,195 30,170 Q15,145 30,120 Q45,95 30,70 Q15,45 30,35 Z"
                    fill="none"
                    className="stroke-wedding-olive"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              
              {/* Friday Card Content */}
              <Card className="relative bg-card/80 backdrop-blur-sm border-none shadow-elegant overflow-hidden">
                <CardContent className="p-8 md:p-12 text-center">
                  <div className="mb-6">
                    <span className="inline-block px-4 py-1 rounded-full bg-wedding-olive/10 text-wedding-olive font-serif text-sm tracking-wider uppercase">
                      {t("timeline.friday.title").split(" ")[0]}
                    </span>
                  </div>
                  <h3 className="font-script text-4xl md:text-5xl text-wedding-olive mb-4">
                    {t("timeline.friday.title").includes("-") 
                      ? t("timeline.friday.title").split("-")[1]?.trim() || t("timeline.friday.title")
                      : "Mingel"
                    }
                  </h3>
                  <p className="font-serif text-xl md:text-2xl text-primary mb-6">
                    {t("timeline.friday.time")}
                  </p>
                  <div className="w-16 h-px bg-wedding-olive/30 mx-auto mb-6"></div>
                  <p className="font-serif text-muted-foreground text-base md:text-lg leading-relaxed max-w-md mx-auto">
                    {t("timeline.friday.description")}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Saturday Section - Dynamic & Rich */}
        <div ref={saturdayRef}>
          {/* Saturday Header */}
          <div 
            className={`text-center mb-12 transition-all duration-700 ease-out ${
              saturdayVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-6"
            }`}
          >
            <div className="inline-flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-wedding-olive"></div>
              <span className="font-serif text-wedding-olive tracking-[0.3em] uppercase text-sm">
                {t("timeline.saturday.title").split(" ")[0] || "Lördag"}
              </span>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-wedding-olive"></div>
            </div>
            <h3 className="font-script text-3xl md:text-4xl text-primary">
              {t("timeline.saturday.title").includes("-") 
                ? t("timeline.saturday.title").split("-")[1]?.trim()
                : t("timeline.saturday.title")
              }
            </h3>
          </div>

          {/* Saturday Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {saturdayEvents.map((event, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ease-out ${
                  saturdayVisible 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-12"
                }`}
                style={{ 
                  transitionDelay: saturdayVisible ? `${(index + 1) * 150}ms` : "0ms" 
                }}
              >
                <Card 
                  className={`group h-full ${event.color} border-none shadow-soft hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 overflow-hidden`}
                >
                  <CardContent className="p-6 md:p-8 flex flex-col h-full">
                    {/* Icon & Time Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-14 h-14 rounded-2xl bg-card/60 backdrop-blur-sm flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                        <event.icon className={`w-7 h-7 ${event.iconColor}`} />
                      </div>
                      <span className="font-serif text-lg text-muted-foreground bg-card/40 px-3 py-1 rounded-full">
                        {event.time}
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h4 className="font-serif text-xl md:text-2xl font-semibold text-primary mb-4 group-hover:text-wedding-olive transition-colors duration-300">
                      {event.title.includes("-") 
                        ? event.title.split("-")[1]?.trim() || event.title
                        : event.title
                      }
                    </h4>
                    
                    {/* Decorative Line */}
                    <div className="w-10 h-0.5 bg-wedding-olive/30 mb-4 group-hover:w-16 transition-all duration-300"></div>
                    
                    {/* Description */}
                    <p className="font-serif text-muted-foreground leading-relaxed flex-grow">
                      {event.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Mobile Swipe Hint */}
          <div className="md:hidden mt-8 text-center">
            <p className="font-serif text-sm text-muted-foreground/60 animate-pulse">
              ↕ {t("language") === "sv" ? "Scrolla för att se alla aktiviteter" : "Scroll to see all activities"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
