import { Clock, Heart, Music } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const Timeline = () => {
  const { t } = useLanguage();

  const saturdayEvents = [
    {
      title: t("timeline.saturday.title"),
      time: t("timeline.saturday.time"),
      description: t("timeline.saturday.description"),
      icon: Heart,
      color: "text-wedding-gold"
    },
    {
      title: t("timeline.dinner.title"),
      time: t("timeline.dinner.time"),
      description: t("timeline.dinner.description"),
      icon: Clock,
      color: "text-wedding-blush"
    },
    {
      title: t("timeline.dancing.title"),
      time: t("timeline.dancing.time"),
      description: t("timeline.dancing.description"),
      icon: Music,
      color: "text-primary"
    }
  ];

  return (
    <section id="timeline" className="py-20 bg-wedding-sage">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-script text-4xl md:text-5xl font-bold text-primary mb-4">
            {t("timeline.title")}
          </h2>
          <div className="w-24 h-px bg-primary mx-auto mb-6"></div>
          <p className="font-serif text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("timeline.subtitle")}
          </p>
        </div>

        <div className="space-y-8">
          {/* Friday Event - Special wavy border design */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Wavy border SVG frame */}
              <svg
                viewBox="0 0 400 320"
                className="w-full h-auto"
                preserveAspectRatio="xMidYMid meet"
              >
                <path
                  d="M20,40 
                     Q40,20 60,40 Q80,60 100,40 Q120,20 140,40 Q160,60 180,40 Q200,20 220,40 Q240,60 260,40 Q280,20 300,40 Q320,60 340,40 Q360,20 380,40
                     Q400,60 380,80 Q360,100 380,120 Q400,140 380,160 Q360,180 380,200 Q400,220 380,240 Q360,260 380,280
                     Q360,300 340,280 Q320,260 300,280 Q280,300 260,280 Q240,260 220,280 Q200,300 180,280 Q160,260 140,280 Q120,300 100,280 Q80,260 60,280 Q40,300 20,280
                     Q0,260 20,240 Q40,220 20,200 Q0,180 20,160 Q40,140 20,120 Q0,100 20,80 Q40,60 20,40"
                  fill="none"
                  stroke="hsl(var(--wedding-olive))"
                  strokeWidth="2"
                  className="drop-shadow-sm"
                />
              </svg>
              
              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-12 py-8">
                <h3 className="font-script text-4xl md:text-5xl text-wedding-olive mb-4">
                  Fredag
                </h3>
                <p className="font-serif text-xl md:text-2xl text-primary mb-4">
                  Mingel: 18:00
                </p>
                <p className="font-serif text-muted-foreground text-sm md:text-base leading-relaxed max-w-xs">
                  {t("timeline.friday.description")}
                </p>
              </div>
            </div>
          </div>

          {/* Saturday Events - Regular cards */}
          {saturdayEvents.map((event, index) => (
            <Card key={index} className="shadow-soft hover:shadow-elegant transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center font-serif text-xl">
                  <event.icon className={`w-6 h-6 mr-3 ${event.color}`} />
                  <div>
                    <span className="block">{event.title}</span>
                    <span className="text-sm text-muted-foreground font-normal">{event.time}</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="font-serif text-muted-foreground">
                <p>{event.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;