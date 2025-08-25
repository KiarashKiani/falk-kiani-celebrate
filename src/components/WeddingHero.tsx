import { useLanguage } from "@/contexts/LanguageContext";

const weddingLogo = "/lovable-uploads/22fe2962-279f-4216-b9f3-3e88381f178f.png";

const WeddingHero = () => {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-romantic overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 opacity-20">
        <div className="w-32 h-32 border border-primary/20 rounded-full"></div>
      </div>
      <div className="absolute bottom-20 right-10 opacity-20">
        <div className="w-24 h-24 border border-primary/20 rounded-full"></div>
      </div>
      
      <div className="text-center px-6 max-w-4xl mx-auto relative z-10">
        <div className="mb-8">
          <img 
            src={weddingLogo} 
            alt="Josefin & Kiarash Wedding Logo" 
            className="w-96 h-auto mx-auto mb-6"
            style={{
              imageRendering: 'pixelated',
              filter: 'contrast(1.1) brightness(1.05)'
            }}
          />
          <p className="font-serif text-xl md:text-2xl text-primary/80 mb-8">
            {t("hero.subtitle")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default WeddingHero;