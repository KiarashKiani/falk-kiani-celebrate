import suitIcon from "@/assets/icons/suit-icon.png";
import childIcon from "@/assets/icons/child-icon.png";
import giftIcon from "@/assets/icons/gift-icon.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState, useRef } from "react";
import WavyBorderCard from "./ui/WavyBorderCard";
import IrregularInfoBox from "./ui/IrregularInfoBox";
import pinIcon from "@/assets/icons/pin-icon.png";
import busIcon from "@/assets/icons/bus-icon.png";
import carIcon from "@/assets/icons/car-icon.png";

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
      title: t("details.gifts.title"),
      content: t("details.gifts.content"),
      delay: "100ms"
    }
  ];

  return (
    <section ref={sectionRef} id="details" className="pt-8 pb-12" style={{ backgroundColor: '#fff9f1' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="font-brittany-heading text-5xl md:text-6xl font-normal" style={{ color: '#ff8a00' }}>
            {t("details.title")}
          </h2>
        </div>

        {/* Accommodation Section - Full Width */}
        <div className="mb-12">
          <WavyBorderCard 
            visible={visible}
            delay="0ms"
            className="hover:-translate-y-1 transition-transform duration-300"
          >
            <h3 className="font-lovely-may text-3xl md:text-4xl mb-6 uppercase tracking-wide font-extralight text-left ml-6 mt-6" style={{ color: '#1b2e00' }}>
              {t("travel.accommodation.title")}
            </h3>
            <p className="font-serif text-base leading-relaxed max-w-3xl mb-8 text-left ml-6" style={{ color: '#1b2e00' }}>
              {t("travel.accommodation.content")}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Steam Hotel */}
              <div className="text-left rounded-lg p-6 flex flex-col" style={{ backgroundColor: '#fff9f1' }}>
                <h4 className="font-serif text-xl font-bold mb-3" style={{ color: '#1b2e00' }}>Steam Hotel</h4>
                <p className="font-serif text-sm mb-3" style={{ color: '#1b2e00' }}>
                  {t("accommodation.steam.description")}
                </p>
                <IrregularInfoBox className="mb-3 flex-1">
                  <p className="font-serif text-sm font-semibold" style={{ color: '#1b2e00' }}>
                    {t("accommodation.steam.discount")}
                  </p>
                  <p className="font-serif text-xs mt-1" style={{ color: '#1b2e00' }}>
                    {t("accommodation.steam.code")}
                  </p>
                  <p className="font-serif text-xs mt-2 italic" style={{ color: '#1b2e00' }}>
                    {t("accommodation.steam.pricing")}
                  </p>
                </IrregularInfoBox>
                <a 
                  href="https://steamhotel.se" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-serif text-sm hover:underline" style={{ color: '#1b2e00' }}
                >
                  steamhotel.se →
                </a>
              </div>
              
              {/* Elite Stadshotellet */}
              <div className="text-left rounded-lg p-6 flex flex-col" style={{ backgroundColor: '#fff9f1' }}>
                <h4 className="font-serif text-xl font-bold mb-3" style={{ color: '#1b2e00' }}>Elite Stadshotellet Västerås</h4>
                <p className="font-serif text-sm mb-3" style={{ color: '#1b2e00' }}>
                  {t("accommodation.elite.description")}
                </p>
                <IrregularInfoBox className="mb-3 flex-1">
                  <p className="font-serif text-sm font-semibold" style={{ color: '#1b2e00' }}>
                    {t("accommodation.elite.booking")}
                  </p>
                  <p className="font-serif text-xs mt-2" style={{ color: '#1b2e00' }}>
                    {t("accommodation.elite.pricing")}
                  </p>
                  <a 
                    href="tel:+46771788789" 
                    className="font-serif text-xs hover:underline block mt-2" style={{ color: '#1b2e00' }}
                  >
                    +46 (0)771-788 789
                  </a>
                  <a 
                    href="mailto:centralreservation@elite.se" 
                    className="font-serif text-xs hover:underline block mt-1" style={{ color: '#1b2e00' }}
                  >
                    centralreservation@elite.se
                  </a>
                </IrregularInfoBox>
                <a 
                  href="https://elite.se/sv/hotell/vasteras/elite-stadshotellet-vasteras/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-serif text-sm hover:underline" style={{ color: '#1b2e00' }}
                >
                  elite.se →
                </a>
              </div>
            </div>
          </WavyBorderCard>
        </div>

        {/* How to Get Here Section - Full Width */}
        <div className="mb-12">
          <WavyBorderCard 
            visible={visible}
            delay="0ms"
            className="hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {/* Address & Map */}
              <div className="text-center rounded-lg p-5" style={{ backgroundColor: '#fff9f1' }}>
                <img src={pinIcon} alt="" className="w-12 h-12 mx-auto mb-3 object-contain" />
                <p className="font-serif text-sm font-semibold mb-2" style={{ color: '#1b2e00' }}>
                  {t("travel.findus.address")}
                </p>
                <p className="font-serif text-xs mb-3" style={{ color: '#1b2e00' }}>
                  {t("travel.findus.distance")}
                </p>
                <a 
                  href="https://maps.app.goo.gl/yJ8WBRLqUyPoYbK69"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif text-sm hover:underline" style={{ color: '#1b2e00' }}
                >
                  {t("travel.findus.link")} →
                </a>
              </div>
              
              {/* Bus Transport */}
              <div className="text-center rounded-lg p-5" style={{ backgroundColor: '#fff9f1' }}>
                <img src={busIcon} alt="" className="w-14 h-12 mx-auto mb-3 object-contain" />
                <p className="font-serif text-sm" style={{ color: '#1b2e00' }}>
                  {t("travel.findus.transport")}
                </p>
              </div>
              
              {/* Parking */}
              <div className="text-center rounded-lg p-5" style={{ backgroundColor: '#fff9f1' }}>
                <img src={carIcon} alt="" className="w-14 h-12 mx-auto mb-3 object-contain" />
                <p className="font-serif text-sm" style={{ color: '#1b2e00' }}>
                  {t("travel.findus.parking")}
                </p>
              </div>
            </div>
          </WavyBorderCard>
        </div>

        {/* Grid of wavy boxes - 3 per row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6 mb-12 max-w-3xl mx-auto">
          {details.map((detail, index) => (
            <WavyBorderCard 
              key={index} 
              visible={visible}
              delay={detail.delay}
              borderColor={index === 1 ? '#89b647' : '#ff8a00'}
              className="hover:-translate-y-2 transition-transform duration-300 min-h-[240px]"
            >
              <h3 className="font-lovely-may text-xl md:text-2xl mb-3 uppercase tracking-wide font-extralight" style={{ color: '#1b2e00' }}>
                {detail.title}
              </h3>
              <div className="font-serif text-sm leading-relaxed relative" style={{ color: '#1b2e00' }}>
                {index === 0 && (
                  <img 
                    src={childIcon} 
                    alt="" 
                    className="absolute bottom-0 -right-4 w-24 h-28 object-contain" 
                  />
                )}
                {index === 1 && (
                  <img 
                    src={giftIcon} 
                    alt="" 
                    className="absolute -bottom-2 -right-6 w-20 h-24 object-contain" 
                  />
                )}
                <p className={index === 0 || index === 1 ? "pr-16" : ""}>{detail.content}</p>
              </div>
            </WavyBorderCard>
          ))}
        </div>

        {/* Larger Dress Code section */}
        <WavyBorderCard 
          visible={visible}
          delay="300ms"
          borderColor="#1b2e00"
          className="hover:-translate-y-1 transition-transform duration-300"
        >
          <div className="flex flex-col md:flex-row">
            <div className="flex-1">
              <h3 className="font-lovely-may text-3xl md:text-4xl uppercase tracking-wide font-extralight mb-6" style={{ color: '#1b2e00' }}>
                {t("details.dresscode.title")}
              </h3>
              
              <div className="font-serif space-y-6" style={{ color: '#1b2e00' }}>
                <div>
                  <h4 className="text-lg font-semibold mb-2" style={{ color: '#1b2e00' }}>
                    {t("details.dresscode.friday.title")}
                  </h4>
                  <p className="font-serif whitespace-pre-line" style={{ color: '#1b2e00' }}>{t("details.dresscode.friday.content")}</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-2" style={{ color: '#1b2e00' }}>
                    {t("details.dresscode.saturday.title")}
                  </h4>
                  <p className="font-serif mb-3" style={{ color: '#1b2e00' }}>{t("details.dresscode.saturday.content")}</p>
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
              </div>
            </div>
            
            <div className="flex items-center justify-center mt-6 md:mt-0 md:pr-4 relative">
              <svg 
                className="absolute w-28 h-36 md:w-40 md:h-52 -left-2 md:-left-4 top-2 md:top-4" 
                viewBox="0 0 100 120" 
                preserveAspectRatio="none"
              >
                <path 
                  d="M 25,8 C 40,2 55,12 70,6 C 88,0 98,18 96,38 C 94,52 85,58 90,75 C 96,95 78,115 55,118 C 35,120 20,108 12,90 C 4,72 8,58 5,42 C 2,26 10,14 25,8 Z" 
                  fill="#fffeb8"
                />
              </svg>
              <img src={suitIcon} alt="" className="w-32 h-44 md:w-48 md:h-64 object-contain relative z-10" />
            </div>
          </div>
        </WavyBorderCard>
      </div>
    </section>
  );
};

export default WeddingDetails;
