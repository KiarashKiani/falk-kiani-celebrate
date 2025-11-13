import { Shirt, Car, Baby, Camera, Gift, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const WeddingDetails = () => {
  const { t } = useLanguage();
  
  const details = [
    {
      icon: Car,
      title: t("details.parking.title"),
      content: t("details.parking.content"),
      color: "text-wedding-sage"
    },
    {
      icon: Baby,
      title: t("details.children.title"),
      content: t("details.children.content"),
      color: "text-wedding-gold"
    },
    {
      icon: Camera,
      title: t("details.hashtag.title"),
      content: t("details.hashtag.content"),
      color: "text-wedding-blush"
    },
    {
      icon: Gift,
      title: t("details.gifts.title"),
      content: t("details.gifts.content"),
      color: "text-primary"
    },
    {
      icon: MapPin,
      title: t("details.venue.title"),
      content: t("details.venue.content"),
      color: "text-wedding-sage"
    },
    {
      icon: Camera,
      title: t("details.photos.title"),
      content: t("details.photos.content"),
      color: "text-wedding-blush"
    }
  ];

  return (
    <section id="details" className="py-20 bg-wedding-sage">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-script text-4xl md:text-5xl font-bold text-primary mb-4">
            {t("details.title")}
          </h2>
          <div className="w-24 h-px bg-primary mx-auto mb-6"></div>
          <p className="font-serif text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("details.subtitle")}
          </p>
        </div>

        {/* Grid of 6 equal-sized boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {details.map((detail, index) => (
            <Card key={index} className="shadow-soft hover:shadow-elegant transition-shadow duration-300 h-full">
              <CardHeader>
                <CardTitle className="flex items-start font-serif text-lg">
                  <detail.icon className={`w-6 h-6 mr-3 mt-1 ${detail.color} flex-shrink-0`} />
                  <span>{detail.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="font-serif text-muted-foreground">
                <p className="text-sm leading-relaxed">{detail.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Larger Dress Code section */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center font-serif text-xl">
              <Shirt className="w-6 h-6 mr-3 text-primary" />
              <span>{t("details.dresscode.title")}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="font-serif text-muted-foreground space-y-6">
            <div>
              <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                {t("details.dresscode.friday.title")}
              </h3>
              <p>{t("details.dresscode.friday.content")}</p>
            </div>
            
            <div>
              <h3 className="font-serif text-lg font-semibold text-foreground mb-3">
                {t("details.dresscode.saturday.title")}
              </h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://www.stroms.com/kladkod-brollop-dam/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-serif transition-colors duration-200 text-sm"
                >
                  {t("details.dresscode.women")}
                </a>
                <a
                  href="https://www.stroms.com/kladkod-brollop-herr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md font-serif transition-colors duration-200 text-sm"
                >
                  {t("details.dresscode.men")}
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default WeddingDetails;