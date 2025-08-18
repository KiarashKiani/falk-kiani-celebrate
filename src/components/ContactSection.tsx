import { Mail, Phone, Instagram } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-script text-4xl md:text-5xl font-bold text-primary mb-4">
          Kontakt
        </h2>
        <div className="w-24 h-px bg-primary mx-auto mb-12"></div>
        
        <Card className="shadow-soft">
          <CardContent className="p-8">
            <p className="font-serif text-lg text-muted-foreground mb-8">
              Har ni frågor eller funderingar? Tveka inte att höra av er till oss!
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center justify-center space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <a 
                  href="mailto:josefin.kiarash@wedding.se" 
                  className="font-serif text-primary hover:text-primary/70 transition-colors"
                >
                  josefin.kiarash@wedding.se
                </a>
              </div>
              
              <div className="flex items-center justify-center space-x-3">
                <Phone className="w-5 h-5 text-primary" />
                <a 
                  href="tel:+46701234567" 
                  className="font-serif text-primary hover:text-primary/70 transition-colors"
                >
                  +46 70 123 45 67
                </a>
              </div>
              
              <div className="flex items-center justify-center space-x-3">
                <Instagram className="w-5 h-5 text-primary" />
                <span className="font-serif text-muted-foreground">
                  Följ oss: @falkkiani2026
                </span>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-border">
              <p className="font-serif text-sm text-muted-foreground">
                Vi ser så mycket fram emot att fira vår kärlek tillsammans med er!
              </p>
              <p className="font-script text-xl text-primary mt-2">
                Med all vår kärlek, Josefin & Kiarash
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ContactSection;