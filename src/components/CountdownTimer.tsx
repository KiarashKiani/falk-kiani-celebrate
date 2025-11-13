import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const CountdownTimer = () => {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

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

  return (
    <section id="countdown" className="py-20 bg-wedding-sage">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="text-center mb-16">
          <h2 className="font-script text-4xl md:text-5xl font-bold text-primary mb-4">
            {t("countdown.title")}
          </h2>
          <div className="w-24 h-px bg-primary mx-auto mb-6"></div>
          <p className="font-serif text-lg text-muted-foreground">
            {t("countdown.subtitle")}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-card rounded-2xl p-6 shadow-soft">
            <div className="font-script text-3xl md:text-4xl font-bold text-primary mb-2">
              {timeLeft.days}
            </div>
            <div className="font-serif text-sm text-muted-foreground uppercase tracking-wide">
              {t("countdown.days")}
            </div>
          </div>
          <div className="bg-card rounded-2xl p-6 shadow-soft">
            <div className="font-script text-3xl md:text-4xl font-bold text-primary mb-2">
              {timeLeft.hours}
            </div>
            <div className="font-serif text-sm text-muted-foreground uppercase tracking-wide">
              {t("countdown.hours")}
            </div>
          </div>
          <div className="bg-card rounded-2xl p-6 shadow-soft">
            <div className="font-script text-3xl md:text-4xl font-bold text-primary mb-2">
              {timeLeft.minutes}
            </div>
            <div className="font-serif text-sm text-muted-foreground uppercase tracking-wide">
              {t("countdown.minutes")}
            </div>
          </div>
          <div className="bg-card rounded-2xl p-6 shadow-soft">
            <div className="font-script text-3xl md:text-4xl font-bold text-primary mb-2">
              {timeLeft.seconds}
            </div>
            <div className="font-serif text-sm text-muted-foreground uppercase tracking-wide">
              {t("countdown.seconds")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountdownTimer;