import { Bus, Hotel, MapPin, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const TravelInfo = () => {
  const { t } = useLanguage();

  const travelDetails = [
    {
      icon: Bus,
      title: t("travel.transport.title"),
      content: t("travel.transport.content"),
      color: "text-wedding-sage"
    },
    {
      icon: Hotel,
      title: t("travel.accommodation.title"),
      content: t("travel.accommodation.content"),
      color: "text-wedding-gold"
    },
    {
      icon: MapPin,
      title: t("travel.directions.title"),
      content: t("travel.directions.content"),
      color: "text-wedding-blush"
    },
    {
      icon: Calendar,
      title: t("travel.weekend.title"),
      content: t("travel.weekend.content"),
      color: "text-primary"
    }
  ];

  return (
    <section id="travel" className="py-20 bg-gradient-sage">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-script text-4xl md:text-5xl font-bold text-primary mb-4">
            {t("travel.title")}
          </h2>
          <div className="w-24 h-px bg-primary mx-auto mb-6"></div>
          <p className="font-serif text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("travel.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {travelDetails.map((detail, index) => (
            <Card key={index} className="shadow-soft hover:shadow-elegant transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center font-serif text-xl">
                  <detail.icon className={`w-6 h-6 mr-3 ${detail.color}`} />
                  <span>{detail.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="font-serif text-muted-foreground">
                <p>{detail.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravelInfo;