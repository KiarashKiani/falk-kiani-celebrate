import { Shirt, MapPin, Bus, Car } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState, useRef } from "react";
import WavyBorderCard from "./ui/WavyBorderCard";

const WeddingDetails = () => {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);
  
  const details = [
    {
      title: t("details.children.title"),
      content: t("details.children.content"),
      delay: "0ms"
    },
    {
      title: t("details.hashtag.title"),
      content: t("details.hashtag.content"),
      delay: "100ms"
    },
    {
      title: t("details.gifts.title"),
      content: t("details.gifts.content"),
      delay: "200ms"
    },
    {
      title: t("details.venue.title"),
      content: t("details.venue.content"),
      delay: "300ms"
    },
    {
      title: t("details.photos.title"),
      content: t("details.photos.content"),
      delay: "400ms"
    }
  ];

  return (
    <section id="details" className="py-24 bg-wedding-sage">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-normal mb-4 uppercase tracking-wider" style={{ fontFamily: "'Lovely May', serif", color: '#416631' }}>
            {t("details.title")}
          </h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-wedding-olive to-transparent mx-auto mb-6"></div>
          <p className="font-serif text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("details.subtitle")}
          </p>
        </div>

        {/* How to Get Here Section - Full Width */}
        <div className="mb-12">
          <WavyBorderCard 
            visible={visible}
            delay="0ms"
            className="hover:-translate-y-1 transition-transform duration-300"
          >
            <h3 className="text-3xl md:text-4xl text-wedding-olive mb-6 font-bold">
              {t("travel.findus.title")}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {/* Address & Map */}
              <div className="text-center rounded-lg p-5" style={{ backgroundColor: '#fff9f1' }}>
                <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="font-serif text-sm font-semibold text-primary mb-2">
                  {t("travel.findus.address")}
                </p>
                <p className="font-serif text-xs text-muted-foreground mb-3">
                  {t("travel.findus.distance")}
                </p>
                <a 
                  href="https://maps.app.goo.gl/yJ8WBRLqUyPoYbK69"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif text-sm text-wedding-olive hover:underline"
                >
                  {t("travel.findus.link")} →
                </a>
              </div>
              
              {/* Bus Transport */}
              <div className="text-center rounded-lg p-5" style={{ backgroundColor: '#fff9f1' }}>
                <Bus className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="font-serif text-sm text-muted-foreground">
                  {t("travel.findus.transport")}
                </p>
              </div>
              
              {/* Parking */}
              <div className="text-center rounded-lg p-5" style={{ backgroundColor: '#fff9f1' }}>
                <Car className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="font-serif text-sm text-muted-foreground">
                  {t("travel.findus.parking")}
                </p>
              </div>
            </div>
          </WavyBorderCard>
        </div>

        {/* Accommodation Section - Full Width */}
        <div className="mb-12">
          <WavyBorderCard 
            visible={visible}
            delay="0ms"
            className="hover:-translate-y-1 transition-transform duration-300"
          >
            <h3 className="text-3xl md:text-4xl text-wedding-olive mb-6 font-bold">
              {t("travel.accommodation.title")}
            </h3>
            <p className="font-serif text-muted-foreground text-base leading-relaxed max-w-3xl mx-auto mb-8">
              {t("travel.accommodation.content")}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Steam Hotel */}
              <div className="text-left rounded-lg p-6 flex flex-col" style={{ backgroundColor: '#fff9f1' }}>
                <h4 className="font-serif text-xl font-bold text-primary mb-3">Steam Hotel</h4>
                <p className="font-serif text-muted-foreground text-sm mb-3">
                  {t("accommodation.steam.description")}
                </p>
                <div className="bg-wedding-champagne/50 rounded-md p-3 mb-3 flex-1">
                  <p className="font-serif text-sm font-semibold text-primary">
                    {t("accommodation.steam.discount")}
                  </p>
                  <p className="font-serif text-xs text-muted-foreground mt-1">
                    {t("accommodation.steam.code")}
                  </p>
                  <p className="font-serif text-xs text-muted-foreground mt-2 italic">
                    {t("accommodation.steam.pricing")}
                  </p>
                </div>
                <a 
                  href="https://steamhotel.se" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-serif text-sm text-wedding-olive hover:underline"
                >
                  steamhotel.se →
                </a>
              </div>
              
              {/* Elite Stadshotellet */}
              <div className="text-left rounded-lg p-6 flex flex-col" style={{ backgroundColor: '#fff9f1' }}>
                <h4 className="font-serif text-xl font-bold text-primary mb-3">Elite Stadshotellet Västerås</h4>
                <p className="font-serif text-muted-foreground text-sm mb-3">
                  {t("accommodation.elite.description")}
                </p>
                <div className="bg-wedding-champagne/50 rounded-md p-3 mb-3 flex-1">
                  <p className="font-serif text-sm font-semibold text-primary">
                    {t("accommodation.elite.booking")}
                  </p>
                  <p className="font-serif text-xs text-muted-foreground mt-2">
                    {t("accommodation.elite.pricing")}
                  </p>
                  <a 
                    href="tel:+46771788789" 
                    className="font-serif text-xs text-wedding-olive hover:underline block mt-2"
                  >
                    +46 (0)771-788 789
                  </a>
                  <a 
                    href="mailto:centralreservation@elite.se" 
                    className="font-serif text-xs text-wedding-olive hover:underline block mt-1"
                  >
                    centralreservation@elite.se
                  </a>
                </div>
                <a 
                  href="https://elite.se/sv/hotell/vasteras/elite-stadshotellet-vasteras/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-serif text-sm text-wedding-olive hover:underline"
                >
                  elite.se →
                </a>
              </div>
            </div>
          </WavyBorderCard>
        </div>

        {/* Grid of wavy boxes - 3 per row */}
        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 mb-12">
          {details.map((detail, index) => (
            <WavyBorderCard 
              key={index} 
              visible={visible}
              delay={detail.delay}
              className="hover:-translate-y-2 transition-transform duration-300 min-h-[240px]"
            >
              <h3 className="text-2xl md:text-3xl text-wedding-olive mb-3 font-bold">
                {detail.title}
              </h3>
              <p className="font-serif text-muted-foreground text-sm leading-relaxed max-w-[240px] mx-auto">
                {detail.content}
              </p>
            </WavyBorderCard>
          ))}
        </div>

        {/* Larger Dress Code section */}
        <Card className="shadow-soft bg-wedding-sage border-wedding-olive/20">
          <CardHeader>
            <CardTitle className="flex items-center text-xl font-bold">
              <Shirt className="w-6 h-6 mr-3 text-primary" />
              <span>{t("details.dresscode.title")}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="font-serif text-muted-foreground space-y-6">
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("details.dresscode.friday.title")}
              </h3>
              <p className="font-serif">{t("details.dresscode.friday.content")}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-foreground mb-3">
                {t("details.dresscode.saturday.title")}
              </h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://www.stroms.com/kladkod-brollop-dam/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-colors duration-200 text-sm"
                >
                  {t("details.dresscode.women")}
                </a>
                <a
                  href="https://www.stroms.com/kladkod-brollop-herr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif inline-flex items-center justify-center px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md transition-colors duration-200 text-sm"
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
