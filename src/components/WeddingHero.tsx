import { Heart } from "lucide-react";

const WeddingHero = () => {
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
          <Heart className="w-12 h-12 mx-auto mb-6 text-primary animate-pulse" />
          <h1 className="font-script text-6xl md:text-8xl font-bold text-primary mb-4">
            Josefin & Kiarash
          </h1>
          <div className="w-24 h-px bg-primary mx-auto mb-6"></div>
          <p className="font-serif text-xl md:text-2xl text-primary/80 mb-8">
            Vi gifter oss!
          </p>
        </div>
        
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 shadow-elegant">
          <h2 className="font-serif text-2xl font-semibold text-primary mb-4">
            17–18 september 2026
          </h2>
          <p className="font-serif text-lg text-muted-foreground mb-2">
            <span className="font-semibold">Fredag 17 september:</span> Meet & Greet, start kl. 18.00
          </p>
          <p className="font-serif text-lg text-muted-foreground mb-6">
            <span className="font-semibold">Lördag 18 september:</span> Vigsel, bröllopsmiddag & fest
          </p>
          <div className="border-t border-border pt-4">
            <p className="font-serif text-lg text-primary font-semibold">
              Nybynäsgård (Magasinet), utanför Västerås
            </p>
            <p className="font-serif text-muted-foreground">
              En vacker miljö där vi vill samla våra nära och kära för att fira vår dag
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeddingHero;