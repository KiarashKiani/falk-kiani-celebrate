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
            <div className="relative w-full max-w-md aspect-square">
              {/* Wavy border SVG frame */}
              <svg
                viewBox="0 0 400 400"
                className="w-full h-full absolute inset-0"
                preserveAspectRatio="xMidYMid meet"
              >
                <path
                  d="M30,50 
                     Q50,25 70,50 Q90,75 110,50 Q130,25 150,50 Q170,75 190,50 Q210,25 230,50 Q250,75 270,50 Q290,25 310,50 Q330,75 350,50 Q370,25 385,50
                     Q405,75 385,100 Q365,125 385,150 Q405,175 385,200 Q365,225 385,250 Q405,275 385,300 Q365,325 385,350
                     Q370,375 350,350 Q330,325 310,350 Q290,375 270,350 Q250,325 230,350 Q210,375 190,350 Q170,325 150,350 Q130,375 110,350 Q90,325 70,350 Q50,375 30,350
                     Q5,325 30,300 Q55,275 30,250 Q5,225 30,200 Q55,175 30,150 Q5,125 30,100 Q55,75 30,50 Z"
                  fill="none"
                  className="stroke-wedding-olive"
                  strokeWidth="2.5"
                />
              </svg>
              
              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-16 py-12">
                <h3 className="font-script text-5xl md:text-6xl text-wedding-olive mb-6">
                  Fredag
                </h3>
                <p className="font-serif text-xl md:text-2xl text-primary mb-4">
                  Mingel: 18:00
                </p>
                <p className="font-serif text-muted-foreground text-sm md:text-base leading-relaxed max-w-[280px]">
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