import { Shirt } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const ClothingCode = () => {
  return (
    <section id="clothing-code" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-script text-4xl md:text-5xl font-bold text-primary mb-4">
            Klädkod
          </h2>
          <div className="w-24 h-px bg-primary mx-auto mb-6"></div>
        </div>

        <div className="space-y-8">
          {/* Friday */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center font-serif text-xl">
                <Shirt className="w-6 h-6 mr-3 text-primary" />
                <span>Fredag – Festfint</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="font-serif text-muted-foreground">
              <p>Festfint. Kvällarna kan bli svala – ta gärna med en extra tröja eller sjal.</p>
            </CardContent>
          </Card>

          {/* Saturday */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center font-serif text-xl">
                <Shirt className="w-6 h-6 mr-3 text-wedding-gold" />
                <span>Lördag – Mörk kostym (smoking går såklart bra)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="font-serif text-muted-foreground space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://www.stroms.com/kladkod-brollop-dam/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-serif transition-colors duration-200 text-center"
                >
                  Beskrivning för kvinnor
                </a>
                <a
                  href="https://www.stroms.com/kladkod-brollop-herr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md font-serif transition-colors duration-200 text-center"
                >
                  Beskrivning för män
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ClothingCode;