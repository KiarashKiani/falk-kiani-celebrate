import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import weddingLogo from "@/assets/wedding-logo.svg";

interface WeddingHeroProps {
  onAuthenticated?: () => void;
  showPasswordInput?: boolean;
}

const WeddingHero = ({ onAuthenticated, showPasswordInput = false }: WeddingHeroProps) => {
  const { t } = useLanguage();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const CORRECT_PASSWORD = "KimjaJohanna";

  useEffect(() => {
    // Wedding date: July 17, 2026, 18:00
    const weddingDate = new Date('2026-07-17T18:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
        {/* Logo */}
        <div className="mb-8">
          <img 
            src={weddingLogo} 
            alt="Josefin & Kiarash Wedding Logo" 
            className="w-42 md:w-52 lg:w-58 h-auto mx-auto"
            style={{ imageRendering: 'crisp-edges', shapeRendering: 'crispEdges' }}
          />
        </div>

        {/* Countdown Timer */}
        {!showPasswordInput && (
          <div className="w-full max-w-2xl mb-8 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-normal mb-2 uppercase tracking-wider" style={{ fontFamily: "'Lovely May', serif", color: '#416631' }}>
              {t("countdown.title")}
            </h2>
            <p className="text-base mb-8" style={{ color: '#322e29' }}>
              {t("countdown.subtitle")}
            </p>
            <div className="grid grid-cols-4 gap-3 md:gap-5">
              <div className="bg-wedding-sage backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-soft border border-wedding-olive/20 transition-all duration-300 hover:shadow-elegant hover:-translate-y-1 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="text-2xl md:text-4xl font-bold mb-1" style={{ color: '#416631' }}>
                  {timeLeft.days}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide">
                  {t("countdown.days")}
                </div>
              </div>
              <div className="bg-wedding-sage backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-soft border border-wedding-olive/20 transition-all duration-300 hover:shadow-elegant hover:-translate-y-1 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="text-2xl md:text-4xl font-bold mb-1" style={{ color: '#416631' }}>
                  {timeLeft.hours}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide">
                  {t("countdown.hours")}
                </div>
              </div>
              <div className="bg-wedding-sage backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-soft border border-wedding-olive/20 transition-all duration-300 hover:shadow-elegant hover:-translate-y-1 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="text-2xl md:text-4xl font-bold mb-1" style={{ color: '#416631' }}>
                  {timeLeft.minutes}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide">
                  {t("countdown.minutes")}
                </div>
              </div>
              <div className="bg-wedding-sage backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-soft border border-wedding-olive/20 transition-all duration-300 hover:shadow-elegant hover:-translate-y-1 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="text-2xl md:text-4xl font-bold mb-1" style={{ color: '#416631' }}>
                  {timeLeft.seconds}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide">
                  {t("countdown.seconds")}
                </div>
              </div>
            </div>
          </div>
        )}

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