import { Mail, Instagram } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import weddingLogo from "@/assets/wedding-logo.svg";

const ContactSection = () => {
  const {
    t
  } = useLanguage();
  return <section id="contact" className="py-24" style={{ backgroundColor: '#fef5ef' }}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-script text-4xl md:text-5xl font-bold mb-4" style={{ color: '#416631' }}>
            {t("contact.title")}
          </h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-wedding-olive to-transparent mx-auto mb-6"></div>
        </div>

        <Card className="shadow-soft mb-12 bg-wedding-sage border-wedding-olive/20">
          <CardHeader>
            
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 text-center">
              <div className="flex flex-col items-center space-y-2">
                <Mail className="w-6 h-6 text-primary" />
                <a href="mailto:contact@example.com" className="font-serif text-muted-foreground hover:text-primary transition-colors">
                  contact@example.com
                </a>
              </div>
              
              <div className="flex flex-col items-center space-y-2">
                <Instagram className="w-6 h-6 text-primary" />
                <a href="https://instagram.com/example" target="_blank" rel="noopener noreferrer" className="font-serif text-muted-foreground hover:text-primary transition-colors">
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
          <div className="font-script text-xl text-primary mb-8">
            <p>{t("contact.regards")}</p>
            <p className="font-bold">{t("contact.names")}</p>
          </div>
          
          {/* Logo at the bottom */}
          <div className="mt-8">
            <img 
              src={weddingLogo} 
              alt="Josefin & Kiarash" 
              className="w-16 md:w-20 h-auto mx-auto opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </section>;
};
export default ContactSection;