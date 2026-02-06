import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import weddingHeroSv from "@/assets/wedding-hero-canva.png";
import weddingHeroEn from "@/assets/wedding-hero-en.png";
import weddingHeroDe from "@/assets/wedding-hero-de.png";

const heroImages: Record<string, string> = {
  sv: weddingHeroSv,
  en: weddingHeroEn,
  de: weddingHeroDe,
};

interface WeddingHeroProps {
  onAuthenticated?: () => void;
  showPasswordInput?: boolean;
}

const WeddingHero = ({ onAuthenticated, showPasswordInput = false }: WeddingHeroProps) => {
  const { t, language } = useLanguage();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const heroImage = heroImages[language] || weddingHeroSv;

  const CORRECT_PASSWORD = "KimjaJohanna";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      sessionStorage.setItem("wedding-authenticated", "true");
      setError("");
      onAuthenticated?.();
    } else {
      setError(t('password.error'));
      setPassword("");
    }
  };

  return (
    <section className="relative flex items-center justify-center overflow-hidden pt-12 pb-4 md:py-16" style={{ backgroundColor: '#fff9f1' }}>
      <div className="text-center px-6 max-w-4xl mx-auto relative z-10 flex flex-col items-center justify-center">
        {/* Canva Hero Design */}
        <div className="mb-4 md:mb-8">
          <img 
            src={heroImage} 
            alt="Josefin & Kiarash - Wedding Weekend - 17-18 July 2026" 
            className="w-full max-w-2xl md:max-w-3xl lg:max-w-4xl h-auto mx-auto"
          />
        </div>

        {/* Password input - compact and visible without scrolling */}
        {showPasswordInput && (
          <div className="w-full max-w-xs mt-4">
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                type="password"
                placeholder={t('password.placeholder')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-center bg-white/80 backdrop-blur-sm"
              />
              {error && (
                <p className="text-destructive text-sm text-center">{error}</p>
              )}
              <Button 
                type="submit" 
                className="w-full rounded-full border-2 border-wedding-olive bg-transparent hover:bg-wedding-olive/10 text-wedding-olive font-serif text-lg py-6"
              >
                {t('password.submit')}
              </Button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default WeddingHero;
