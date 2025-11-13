import { Mail, Phone, Instagram } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactSection = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-20 bg-wedding-sage">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-script text-4xl md:text-5xl font-bold text-primary mb-4">
            {t("contact.title")}
          </h2>
          <div className="w-24 h-px bg-primary mx-auto mb-6"></div>
        </div>

        <Card className="shadow-soft mb-12">
          <CardHeader>
            <CardTitle className="font-script text-2xl text-center text-primary">
              {t("contact.title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center space-y-2">
                <Mail className="w-6 h-6 text-primary" />
                <a 
                  href="mailto:contact@example.com" 
                  className="font-serif text-muted-foreground hover:text-primary transition-colors"
                >
                  contact@example.com
                </a>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Phone className="w-6 h-6 text-primary" />
                <a 
                  href="tel:+46123456789" 
                  className="font-serif text-muted-foreground hover:text-primary transition-colors"
                >
                  +46 123 456 789
                </a>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Instagram className="w-6 h-6 text-primary" />
                <a 
                  href="https://instagram.com/example" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-serif text-muted-foreground hover:text-primary transition-colors"
                >
                  @example
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="font-serif text-lg text-muted-foreground mb-6">
            {t("contact.message")}
          </p>
          <div className="font-script text-xl text-primary">
            <p>{t("contact.regards")}</p>
            <p className="font-bold">{t("contact.names")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;