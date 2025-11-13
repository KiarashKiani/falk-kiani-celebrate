import { useLanguage } from "@/contexts/LanguageContext";
import weddingLogo from "@/assets/wedding-logo-2026.png";

const WeddingHero = () => {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-wedding-sage overflow-hidden">
      
      <div className="text-center px-6 max-w-4xl mx-auto relative z-10">
        <div className="mb-8">
          <img 
            src={weddingLogo} 
            alt="Josefin & Kiarash Wedding Logo" 
            className="w-96 h-auto mx-auto mb-6"
          />
          <p className="font-serif text-xl md:text-2xl text-foreground mb-8">
            {t("hero.subtitle")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default WeddingHero;