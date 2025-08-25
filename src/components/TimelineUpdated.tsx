import { Clock, Coffee, Heart, Music } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const Timeline = () => {
  const { t } = useLanguage();

  const events = [
    {
      day: "Friday",
      title: t("timeline.friday.title"),
      time: t("timeline.friday.time"),
      description: t("timeline.friday.description"),
      icon: Coffee,
      color: "text-wedding-sage"
    },
    {
      day: "Saturday",
      title: t("timeline.saturday.title"),
      time: t("timeline.saturday.time"),
      description: t("timeline.saturday.description"),
      icon: Heart,
      color: "text-wedding-gold"
    },
    {
      day: "Saturday",
      title: t("timeline.dinner.title"),
      time: t("timeline.dinner.time"),
      description: t("timeline.dinner.description"),
      icon: Clock,
      color: "text-wedding-blush"
    },
    {
      day: "Saturday",
      title: t("timeline.dancing.title"),
      time: t("timeline.dancing.time"),
      description: t("timeline.dancing.description"),
      icon: Music,
      color: "text-primary"
    }
  ];

  return (
    <section id="timeline" className="py-20 bg-gradient-blush">
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
          {events.map((event, index) => (
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