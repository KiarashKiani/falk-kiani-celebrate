import { MapPin, Bus, Hotel, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const TravelInfo = () => {
  return (
    <section id="travel" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-script text-4xl md:text-5xl font-bold text-primary mb-4">
            Reseinformation
          </h2>
          <div className="w-24 h-px bg-primary mx-auto mb-6"></div>
          <p className="font-serif text-lg text-muted-foreground max-w-2xl mx-auto">
            All information ni behöver för att komma till oss och bo bekvämt under helgen
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Transportation */}
          <Card className="shadow-soft hover:shadow-elegant transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center font-serif">
                <Bus className="w-6 h-6 mr-3 text-primary" />
                Bussar
              </CardTitle>
            </CardHeader>
            <CardContent className="font-serif text-muted-foreground">
              <p>Vi ordnar bussar till och från Västerås centrum till Nybynäsgård både fredag och lördag.</p>
              <p className="mt-2 font-semibold">Bussarna avgår från våra rekommenderade hotell.</p>
            </CardContent>
          </Card>

          {/* Accommodation */}
          <Card className="shadow-soft hover:shadow-elegant transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center font-serif">
                <Hotel className="w-6 h-6 mr-3 text-primary" />
                Logi
              </CardTitle>
            </CardHeader>
            <CardContent className="font-serif text-muted-foreground">
              <p className="mb-3">Vi rekommenderar följande hotell i Västerås:</p>
              <ul className="space-y-2 text-sm">
                <li>• Steam Hotel (design & spa)</li>
                <li>• Elite Stadshotellet Västerås (klassiskt & centralt)</li>
                <li>• Comfort Hotel Västerås (prisvärt & modernt)</li>
              </ul>
            </CardContent>
          </Card>

          {/* Directions */}
          <Card className="shadow-soft hover:shadow-elegant transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center font-serif">
                <MapPin className="w-6 h-6 mr-3 text-primary" />
                Vägbeskrivning
              </CardTitle>
            </CardHeader>
            <CardContent className="font-serif text-muted-foreground">
              <p className="font-semibold mb-2">Nybynäs Gård</p>
              <p className="text-sm">Kärrbo Nyby 1, 725 97 Västerås</p>
              <button className="mt-3 text-primary hover:text-primary/70 text-sm underline">
                Öppna i Google Maps
              </button>
            </CardContent>
          </Card>

          {/* Itinerary Recommendations */}
          <Card className="md:col-span-2 lg:col-span-3 shadow-soft hover:shadow-elegant transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center font-serif">
                <Calendar className="w-6 h-6 mr-3 text-primary" />
                Rekommendationer för helgen
              </CardTitle>
            </CardHeader>
            <CardContent className="font-serif text-muted-foreground">
              <p className="mb-4">För er som stannar längre rekommenderar vi att upptäcka Västerås och Mälarregionen.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-primary mb-2">Sevärdheter:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Västerås domkyrka</li>
                    <li>• Kokpunkten Actionbad</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-2">Utflykter:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Strömsholms slott</li>
                    <li>• Skärgårdstur på Mälaren</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TravelInfo;