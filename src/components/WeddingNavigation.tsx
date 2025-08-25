import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const weddingLogo = "/lovable-uploads/22fe2962-279f-4216-b9f3-3e88381f178f.png";

const WeddingNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { name: t("nav.home"), href: "#home" },
    { name: t("nav.info"), href: "#info" },
    { name: t("nav.travel"), href: "#travel" },
    { name: t("nav.timeline"), href: "#timeline" },
    { name: t("nav.rsvp"), href: "#rsvp" },
    { name: t("nav.contact"), href: "#contact" }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-card/90 backdrop-blur-md border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <img 
            src={weddingLogo} 
            alt="Josefin & Kiarash" 
            className="h-8 w-auto"
          />
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="font-serif text-primary hover:text-primary/70 transition-colors duration-200"
              >
                {item.name}
              </button>
            ))}
            
            {/* Language Toggle */}
            <div className="flex items-center space-x-2 ml-4">
              <Globe className="w-4 h-4 text-primary" />
              <button
                onClick={() => setLanguage(language === 'sv' ? 'en' : 'sv')}
                className="font-serif text-primary hover:text-primary/70 transition-colors duration-200 text-sm"
              >
                {language === 'sv' ? 'English' : 'Svenska'}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden bg-card border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-3 py-2 font-serif text-primary hover:bg-secondary rounded-md transition-colors duration-200"
                >
                  {item.name}
                </button>
              ))}
              
              {/* Mobile Language Toggle */}
              <div className="flex items-center px-3 py-2 space-x-2 border-t border-border mt-2 pt-3">
                <Globe className="w-4 h-4 text-primary" />
                <button
                  onClick={() => {
                    setLanguage(language === 'sv' ? 'en' : 'sv');
                    setIsOpen(false);
                  }}
                  className="font-serif text-primary hover:text-primary/70 transition-colors duration-200 text-sm"
                >
                  {language === 'sv' ? 'English' : 'Svenska'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default WeddingNavigation;