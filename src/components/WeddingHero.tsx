import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import weddingLogo from "@/assets/wedding-logo.png";

interface WeddingHeroProps {
  onAuthenticated?: () => void;
  showPasswordInput?: boolean;
}

const WeddingHero = ({ onAuthenticated, showPasswordInput = false }: WeddingHeroProps) => {
  const { t } = useLanguage();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
    <section className="relative min-h-screen flex items-center justify-center bg-wedding-sage overflow-hidden">
      <div className="text-center px-6 max-w-4xl mx-auto relative z-10 flex flex-col items-center justify-center">
        {/* Logo and subtitle - positioned higher */}
        <div className="mb-6">
          <img 
            src={weddingLogo} 
            alt="Josefin & Kiarash Wedding Logo" 
            className="w-72 md:w-96 h-auto mx-auto mb-4"
          />
          <p className="font-serif text-xl md:text-2xl text-foreground">
            {t("hero.subtitle")}
          </p>
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
              <Button type="submit" className="w-full">
                <Heart className="w-4 h-4 mr-2" />
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