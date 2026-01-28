import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const WeddingNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { name: t("nav.home"), href: "#home" },
    { name: t("nav.timeline"), href: "#timeline" },
    { name: t("nav.info"), href: "#details" },
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
    <nav className="sticky top-0 w-full bg-[#fff9f1] z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-16">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="font-serif text-[#416631] hover:text-[#416631]/70 transition-colors duration-200 uppercase tracking-widest text-sm"
              >
                {item.name}
              </button>
            ))}
            
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'sv' ? 'en' : language === 'en' ? 'de' : 'sv')}
              className="flex items-center space-x-1.5 font-serif text-[#416631] hover:text-[#416631]/70 transition-colors duration-200 text-sm"
            >
              <span className="text-base">{language === 'sv' ? '🇬🇧' : language === 'en' ? '🇩🇪' : '🇸🇪'}</span>
              <span>{language === 'sv' ? 'English' : language === 'en' ? 'Deutsch' : 'Svenska'}</span>
            </button>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden absolute right-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#416631]"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden bg-[#fff9f1]">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-center px-3 py-2 font-serif text-[#416631] hover:bg-[#416631]/10 rounded-md transition-colors duration-200 uppercase tracking-widest text-sm"
                >
                  {item.name}
                </button>
              ))}
              
              {/* Mobile Language Toggle */}
              <div className="flex justify-center px-3 py-2 border-t border-[#416631]/20 mt-2 pt-3">
                <button
                  onClick={() => {
                    setLanguage(language === 'sv' ? 'en' : language === 'en' ? 'de' : 'sv');
                    setIsOpen(false);
                  }}
                  className="flex items-center space-x-2 font-serif text-[#416631] hover:text-[#416631]/70 transition-colors duration-200 text-sm"
                >
                  <span className="text-base">{language === 'sv' ? '🇬🇧' : language === 'en' ? '🇩🇪' : '🇸🇪'}</span>
                  <span>{language === 'sv' ? 'English' : language === 'en' ? 'Deutsch' : 'Svenska'}</span>
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