import { Shirt, Car, Baby, Camera, Gift, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const WeddingDetails = () => {
  const details = [
    {
      icon: Shirt,
      title: "Klädkod",
      content: "Kavaj – finklädd men bekväm",
      color: "text-primary"
    },
    {
      icon: Car,
      title: "Parkering",
      content: "Gratis parkering finns vid Nybynäsgård",
      color: "text-wedding-sage"
    },
    {
      icon: Baby,
      title: "Barn",
      content: "Barn är varmt välkomna under dagen. På kvällen önskar vi fira med vuxna gäster.",
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
      title: "Tillgänglighet",
      content: "Lokalen är handikappanpassad. Hör gärna av er om ni har särskilda behov.",
      color: "text-wedding-sage"
    }
  ];

  return (
    <section id="details" className="py-20 bg-gradient-gold">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-script text-4xl md:text-5xl font-bold text-primary mb-4">
            Bra att veta
          </h2>
          <div className="w-24 h-px bg-primary mx-auto mb-6"></div>
          <p className="font-serif text-lg text-muted-foreground max-w-2xl mx-auto">
            Här är all praktisk information för att göra er dag så bra som möjlig
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {details.map((detail, index) => (
            <Card key={index} className="shadow-soft hover:shadow-elegant transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-start font-serif">
                  <detail.icon className={`w-6 h-6 mr-3 mt-1 ${detail.color} flex-shrink-0`} />
                  <span>{detail.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="font-serif text-muted-foreground">
                <p>{detail.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Special sections */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="font-serif text-xl">Inomhus / Utomhus</CardTitle>
            </CardHeader>
            <CardContent className="font-serif text-muted-foreground">
              <p>
                Vigseln hålls i äppellunden utomhus (vid bra väder). 
                Middag och fest hålls inomhus i Magasinet.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="font-serif text-xl">Bilder efter bröllopet</CardTitle>
            </CardHeader>
            <CardContent className="font-serif text-muted-foreground">
              <p>
                Efter bröllopet kommer vi samla alla bilder här så att ni kan 
                ladda ner och återuppleva dagen tillsammans med oss.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WeddingDetails;