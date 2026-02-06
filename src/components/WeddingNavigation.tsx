import { useState } from "react";
import { Home, Calendar, Info, Mail, MessageSquare } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const WeddingNavigation = () => {
  const [activeSection, setActiveSection] = useState("home");
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { name: t("nav.home"), href: "#home", id: "home", icon: Home },
    { name: t("nav.timeline"), href: "#timeline", id: "timeline", icon: Calendar },
    { name: t("nav.info"), href: "#details", id: "details", icon: Info },
    { name: t("nav.rsvp"), href: "#rsvp", id: "rsvp", icon: Mail },
    { name: t("nav.contact"), href: "#contact", id: "contact", icon: MessageSquare }
  ];

  const scrollToSection = (href: string, id: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(id);
  };

  return (
    <>
      {/* Desktop Navigation - Sticky top */}
      <nav className="hidden md:block sticky top-0 w-full bg-[#fff9f1] z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-16">
            <div className="flex items-center space-x-12">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href, item.id)}
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
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Tab Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#fff9f1]/95 backdrop-blur-md z-50 border-t border-[#416631]/10 safe-area-bottom">
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.href, item.id)}
                className={`flex flex-col items-center justify-center flex-1 py-2 transition-all duration-200 ${
                  isActive 
                    ? "text-[#ff8a00]" 
                    : "text-[#416631]/70 hover:text-[#416631]"
                }`}
              >
                <Icon 
                  className={`w-5 h-5 mb-1 transition-transform duration-200 ${
                    isActive ? "scale-110" : ""
                  }`} 
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span className={`text-[10px] uppercase tracking-wide font-serif ${
                  isActive ? "font-semibold" : ""
                }`}>
                  {item.name.split(' ')[0]}
                </span>
              </button>
            );
          })}
          
          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'sv' ? 'en' : language === 'en' ? 'de' : 'sv')}
            className="flex flex-col items-center justify-center flex-1 py-2 text-[#416631]/70 hover:text-[#416631] transition-colors duration-200"
          >
            <span className="text-lg mb-1">{language === 'sv' ? '🇬🇧' : language === 'en' ? '🇩🇪' : '🇸🇪'}</span>
            <span className="text-[10px] uppercase tracking-wide font-serif">
              {language === 'sv' ? 'EN' : language === 'en' ? 'DE' : 'SV'}
            </span>
          </button>
        </div>
      </nav>

      {/* Spacer for mobile bottom nav */}
      <div className="md:hidden h-16" />
    </>
  );
};

export default WeddingNavigation;