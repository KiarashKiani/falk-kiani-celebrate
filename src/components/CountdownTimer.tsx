import { useState, useEffect } from "react";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Wedding date: September 18, 2026, 15:00
    const weddingDate = new Date('2026-09-18T15:00:00').getTime();

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
    <section id="countdown" className="py-20 bg-gradient-gold">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-script text-4xl md:text-5xl font-bold text-primary mb-4">
          Nedräkning till vår stora dag
        </h2>
        <p className="font-serif text-lg text-muted-foreground mb-12">
          Vi räknar ner dagarna tills vi får fira med er!
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-card rounded-2xl p-6 shadow-soft">
            <div className="font-script text-3xl md:text-4xl font-bold text-primary mb-2">
              {timeLeft.days}
            </div>
            <div className="font-serif text-sm text-muted-foreground uppercase tracking-wide">
              Dagar
            </div>
          </div>
          <div className="bg-card rounded-2xl p-6 shadow-soft">
            <div className="font-script text-3xl md:text-4xl font-bold text-primary mb-2">
              {timeLeft.hours}
            </div>
            <div className="font-serif text-sm text-muted-foreground uppercase tracking-wide">
              Timmar
            </div>
          </div>
          <div className="bg-card rounded-2xl p-6 shadow-soft">
            <div className="font-script text-3xl md:text-4xl font-bold text-primary mb-2">
              {timeLeft.minutes}
            </div>
            <div className="font-serif text-sm text-muted-foreground uppercase tracking-wide">
              Minuter
            </div>
          </div>
          <div className="bg-card rounded-2xl p-6 shadow-soft">
            <div className="font-script text-3xl md:text-4xl font-bold text-primary mb-2">
              {timeLeft.seconds}
            </div>
            <div className="font-serif text-sm text-muted-foreground uppercase tracking-wide">
              Sekunder
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountdownTimer;