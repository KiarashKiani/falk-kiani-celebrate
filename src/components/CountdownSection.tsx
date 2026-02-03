import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const CountdownSection = () => {
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
    <section className="pt-20 pb-10" style={{ backgroundColor: '#fff9f1' }}>
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-normal mb-8 uppercase tracking-wider" style={{ fontFamily: "'Lovely May', serif", color: '#416631' }}>
          {t("countdown.title")}
        </h2>
        <div className="grid grid-cols-4 gap-3 md:gap-5">
          <div className="bg-[#89b647] rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] p-4 md:p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="text-2xl md:text-4xl font-bold mb-1" style={{ color: '#fffeb8' }}>
              {timeLeft.days}
            </div>
            <div className="text-xs md:text-sm uppercase tracking-wide" style={{ color: '#fffeb8' }}>
              {t("countdown.days")}
            </div>
          </div>
          <div className="bg-[#89b647] rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] p-4 md:p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="text-2xl md:text-4xl font-bold mb-1" style={{ color: '#fffeb8' }}>
              {timeLeft.hours}
            </div>
            <div className="text-xs md:text-sm uppercase tracking-wide" style={{ color: '#fffeb8' }}>
              {t("countdown.hours")}
            </div>
          </div>
          <div className="bg-[#89b647] rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] p-4 md:p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="text-2xl md:text-4xl font-bold mb-1" style={{ color: '#fffeb8' }}>
              {timeLeft.minutes}
            </div>
            <div className="text-xs md:text-sm uppercase tracking-wide" style={{ color: '#fffeb8' }}>
              {t("countdown.minutes")}
            </div>
          </div>
          <div className="bg-[#89b647] rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] p-4 md:p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="text-2xl md:text-4xl font-bold mb-1" style={{ color: '#fffeb8' }}>
              {timeLeft.seconds}
            </div>
            <div className="text-xs md:text-sm uppercase tracking-wide" style={{ color: '#fffeb8' }}>
              {t("countdown.seconds")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountdownSection;
