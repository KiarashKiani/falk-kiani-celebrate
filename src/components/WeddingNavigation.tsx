import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

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
        <div className="flex justify-center items-center h-14 md:h-16">
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

          {/* Mobile: Language toggle left, Hamburger right */}
          <div className="md:hidden flex items-center justify-between w-full">
            <button
              onClick={() => setLanguage(language === 'sv' ? 'en' : language === 'en' ? 'de' : 'sv')}
              className="flex items-center space-x-1.5 font-serif text-[#416631] hover:text-[#416631]/70 transition-colors duration-200 text-sm"
            >
              <span className="text-lg">{language === 'sv' ? '🇬🇧' : language === 'en' ? '🇩🇪' : '🇸🇪'}</span>
              <span className="text-xs uppercase tracking-wide">
                {language === 'sv' ? 'EN' : language === 'en' ? 'DE' : 'SV'}
              </span>
            </button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#416631] hover:bg-[#416631]/10"
            >
              <div className="relative w-6 h-6">
                <Menu className={cn(
                  "h-6 w-6 absolute inset-0 transition-all duration-300",
                  isOpen ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"
                )} />
                <X className={cn(
                  "h-6 w-6 absolute inset-0 transition-all duration-300",
                  isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"
                )} />
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        <div className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-out bg-[#fff9f1]",
          isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="py-3 space-y-1 border-t border-[#416631]/10">
            {navItems.map((item, index) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={cn(
                  "block w-full text-center px-4 py-3 font-serif text-[#416631] hover:bg-[#416631]/5 rounded-md transition-all duration-200 uppercase tracking-widest text-sm",
                  "transform transition-all duration-300",
                  isOpen 
                    ? "translate-y-0 opacity-100" 
                    : "translate-y-[-10px] opacity-0"
                )}
                style={{ 
                  transitionDelay: isOpen ? `${index * 50}ms` : '0ms'
                }}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default WeddingNavigation;