import { Shirt, Car, Baby, Camera, Gift, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const WeddingDetails = () => {
  const details = [
    {
      icon: Car,
      title: "Parkering",
      content: "Gratis parkering finns vid Nybynäsgård",
      color: "text-wedding-sage"
    },
    {
      icon: Baby,
      title: "Barn",
      content: "Vi vill att ni som gäster ska kunna njuta fullt ut utan vardagens ansvar. Därför firar vi som en vuxenfest. Ammande spädbarn är givetvis varmt välkomna.",
      color: "text-wedding-gold"
    },
    {
      icon: Camera,
      title: "Hashtag",
      content: "#FalkKiani2026 - Dela gärna era bilder!",
      color: "text-wedding-blush"
    },
    {
      icon: Gift,
      title: "Bröllopsönskan",
      content: "Det viktigaste för oss är att ni kommer och firar med oss. Vill ni ändå ge en gåva uppskattar vi bidrag till vår bröllopsresa.",
      color: "text-primary"
    },
    {
      icon: MapPin,
      title: "Inomhus / Utomhus",
      content: "Vigseln hålls i äppellunden utomhus (vid bra väder). Middag och fest hålls inomhus i Magasinet.",
      color: "text-wedding-sage"
    },
    {
      icon: Camera,
      title: "Bilder efter bröllopet",
      content: "Efter bröllopet kommer vi samla alla bilder här så att ni kan ladda ner och återuppleva dagen tillsammans med oss.",
      color: "text-wedding-blush"
    }
  ];

  return (
    <section id="details" className="py-20 bg-gradient-gold">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-script text-4xl md:text-5xl font-bold text-primary mb-4">
            Bra att veta
          </h2>
          <div className="w-24 h-px bg-primary mx-auto mb-6"></div>
          <p className="font-serif text-lg text-muted-foreground max-w-2xl mx-auto">
            Här är all praktisk information för att göra er dag så bra som möjlig
          </p>
        </div>

        {/* Grid of 6 equal-sized boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {details.map((detail, index) => (
            <Card key={index} className="shadow-soft hover:shadow-elegant transition-shadow duration-300 h-full">
              <CardHeader>
                <CardTitle className="flex items-start font-serif text-lg">
                  <detail.icon className={`w-6 h-6 mr-3 mt-1 ${detail.color} flex-shrink-0`} />
                  <span>{detail.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="font-serif text-muted-foreground">
                <p className="text-sm leading-relaxed">{detail.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Larger Dress Code section */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center font-serif text-xl">
              <Shirt className="w-6 h-6 mr-3 text-primary" />
              <span>Klädkod</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="font-serif text-muted-foreground space-y-6">
            <div>
              <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                Fredag – Festfint
              </h3>
              <p>Festfint. Kvällarna kan bli svala – ta gärna med en extra tröja eller sjal.</p>
            </div>
            
            <div>
              <h3 className="font-serif text-lg font-semibold text-foreground mb-3">
                Lördag – Mörk kostym (smoking går såklart bra)
              </h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://www.stroms.com/kladkod-brollop-dam/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-serif transition-colors duration-200 text-sm"
                >
                  Beskrivning för kvinnor
                </a>
                <a
                  href="https://www.stroms.com/kladkod-brollop-herr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md font-serif transition-colors duration-200 text-sm"
                >
                  Beskrivning för män
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default WeddingDetails;