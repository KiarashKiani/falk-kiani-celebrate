import { Mail, Instagram } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import weddingLogo from "@/assets/wedding-logo.svg";
const ContactSection = () => {
  const {
    t
  } = useLanguage();
  return <section id="contact" className="pt-8 pb-24" style={{
    backgroundColor: '#fff9f1'
  }}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-brittany-heading text-5xl md:text-6xl font-normal mb-4" style={{
          color: '#ff8a00'
        }}>
            {t("contact.title")}
          </h2>
        </div>

        <Card className="shadow-soft mb-12 bg-wedding-sage border-wedding-olive/20">
          <CardHeader>
            
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 text-center">
              <div className="flex flex-col items-center space-y-2">
                <Mail className="w-6 h-6 text-primary" />
                <a className="font-serif text-muted-foreground hover:text-primary transition-colors" href="mailto:falkkiani2026@gmail.com">
                  falkkiani2026@gmail.com
                </a>
              </div>
              
              <div className="flex flex-col items-center space-y-2">
                <Instagram className="w-6 h-6 text-primary" />
                <a target="_blank" rel="noopener noreferrer" className="font-serif text-muted-foreground hover:text-primary transition-colors" href="https://instagram.com/falkkiani">
                  @falkkiani
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
            <img src={weddingLogo} alt="Josefin & Kiarash" className="w-32 md:w-40 h-auto mx-auto opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer" />
          </div>
        </div>
      </div>
    </section>;
};
export default ContactSection;