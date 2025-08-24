import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

const weddingLogo = "/lovable-uploads/22fe2962-279f-4216-b9f3-3e88381f178f.png";

const WeddingNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Hem", href: "#home" },
    { name: "Information", href: "#info" },
    { name: "Resa", href: "#travel" },
    { name: "Schema", href: "#timeline" },
    { name: "OSA", href: "#rsvp" },
    { name: "Kontakt", href: "#contact" }
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
            style={{
              imageRendering: 'auto',
              filter: 'none',
              maxWidth: '100%',
              height: 'auto'
            }}
            loading="eager"
          />
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="font-serif text-primary hover:text-primary/70 transition-colors duration-200"
              >
                {item.name}
              </button>
            ))}
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
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default WeddingNavigation;