import { Shirt } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState, useRef } from "react";
import wavyBorder from "@/assets/wavy-border.png";

// Reusable wavy border card component using image
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
    className={`relative transition-all duration-700 ease-out ${
      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
    } ${className}`}
    style={{ transitionDelay: visible ? delay : "0ms" }}
  >
    {/* White background - bottom layer */}
    <div className="absolute inset-0 bg-white" style={{ margin: '8%', borderRadius: '8px' }}></div>
    
    {/* Wavy border image frame - on top */}
    <img 
      src={wavyBorder} 
      alt="" 
      className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
      aria-hidden="true"
    />
    
    {/* Content - highest layer */}
    <div className="relative z-20 px-8 pt-12 pb-8 text-center h-full flex flex-col justify-start">
      {children}
    </div>
  </div>
);

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
      title: t("travel.transport.title"),
      content: t("travel.transport.content"),
      delay: "0ms"
    },
    {
      title: t("travel.accommodation.title"),
      content: t("travel.accommodation.content"),
      delay: "100ms"
    },
    {
      title: t("travel.directions.title"),
      content: t("travel.directions.content"),
      delay: "200ms"
    },
    {
      title: t("details.parking.title"),
      content: t("details.parking.content"),
      delay: "300ms"
    },
    {
      title: t("details.children.title"),
      content: t("details.children.content"),
      delay: "400ms"
    },
    {
      title: t("details.hashtag.title"),
      content: t("details.hashtag.content"),
      delay: "500ms"
    },
    {
      title: t("details.gifts.title"),
      content: t("details.gifts.content"),
      delay: "600ms"
    },
    {
      title: t("details.venue.title"),
      content: t("details.venue.content"),
      delay: "700ms"
    },
    {
      title: t("details.photos.title"),
      content: t("details.photos.content"),
      delay: "800ms"
    }
  ];

  return (
    <section id="details" className="py-20 bg-wedding-sage">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-normal text-primary mb-4 uppercase tracking-wider" style={{ fontFamily: "'Lovely May', serif" }}>
            {t("details.title")}
          </h2>
          <div className="w-24 h-px bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("details.subtitle")}
          </p>
        </div>

        {/* Grid of wavy boxes - 3 per row */}
        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 mb-12">
          {details.map((detail, index) => (
            <WavyCard 
              key={index} 
              visible={visible}
              delay={detail.delay}
              className="hover:-translate-y-2 transition-transform duration-300 min-h-[240px]"
            >
              <h3 className="text-2xl md:text-3xl text-wedding-olive mb-3 font-bold">
                {detail.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-[240px] mx-auto">
                {detail.content}
              </p>
            </WavyCard>
          ))}
        </div>

        {/* Larger Dress Code section */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center text-xl font-bold">
              <Shirt className="w-6 h-6 mr-3 text-primary" />
              <span>{t("details.dresscode.title")}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-6">
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("details.dresscode.friday.title")}
              </h3>
              <p>{t("details.dresscode.friday.content")}</p>
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
                  className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-colors duration-200 text-sm"
                >
                  {t("details.dresscode.women")}
                </a>
                <a
                  href="https://www.stroms.com/kladkod-brollop-herr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md transition-colors duration-200 text-sm"
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
