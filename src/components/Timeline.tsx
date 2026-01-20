import { useEffect, useState, useRef } from "react";
import wavyBorder from "@/assets/wavy-border.png";

// Wavy border card component using the image
const WavyEventCard = ({ 
  children, 
  className = "",
  visible = true,
  delay = "0ms"
}: { 
  children: React.ReactNode; 
  className?: string;
  visible?: boolean;
  delay?: string;
}) => (
  <div 
    className={`relative transition-all duration-700 ease-out ${
      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
    } ${className}`}
    style={{ transitionDelay: visible ? delay : "0ms" }}
  >
    {/* Wavy border image frame */}
    <img 
      src={wavyBorder} 
      alt="" 
      className="absolute inset-0 w-full h-full object-fill pointer-events-none"
      aria-hidden="true"
    />
    
    {/* Content */}
    <div className="relative px-8 py-10 text-center h-full flex flex-col justify-center">
      {children}
    </div>
  </div>
);

const Timeline = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const fridayEvents = [
    {
      title: "Mingel",
      description: "Avslappnat mingel med drinkar och lätta tilltugg. En perfekt chans att träffa andra gäster innan den stora dagen.",
      delay: "0ms"
    }
  ];

  const saturdayEvents = [
    {
      title: "Vigselceremoni",
      time: "15:00",
      description: "Vi säger ja till varandra i äppellunden",
      delay: "100ms"
    },
    {
      title: "Skål & Mingel",
      time: "16:00",
      description: "Champagne och gratulationer efter ceremonin",
      delay: "200ms"
    },
    {
      title: "Bröllopsmiddag",
      time: "17:30",
      description: "Festmiddag i Magasinet med tal och skratt",
      delay: "300ms"
    },
    {
      title: "Fest & Dans",
      time: "20:00",
      description: "Nu dansar vi natten lång!",
      delay: "400ms"
    }
  ];

  return (
    <section id="timeline" className="py-20 bg-wedding-sage">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-normal text-primary mb-4 uppercase tracking-wider" style={{ fontFamily: "'Lovely May', serif" }}>
            Schema för helgen
          </h2>
          <div className="w-24 h-px bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground">
            Så här ser vår bröllopshelg ut – vi hoppas ni kan vara med på allt!
          </p>
        </div>

        {/* Friday Section */}
        <div className="mb-16">
          <h3 className="text-3xl md:text-4xl text-center text-wedding-olive mb-8 uppercase tracking-[0.3em]" style={{ fontFamily: "'Lovely May', serif" }}>
            Fredag
          </h3>
          <div ref={sectionRef} className="flex justify-center">
            {fridayEvents.map((event, index) => (
              <WavyEventCard 
                key={index}
                visible={visible}
                delay={event.delay}
                className="w-full max-w-md min-h-[200px]"
              >
                <h4 className="text-3xl md:text-4xl text-primary mb-3" style={{ fontFamily: "'Brittany', cursive" }}>
                  {event.title}
                </h4>
                <p className="text-muted-foreground text-base leading-relaxed max-w-[280px] mx-auto">
                  {event.description}
                </p>
              </WavyEventCard>
            ))}
          </div>
        </div>

        {/* Saturday Section */}
        <div>
          <h3 className="text-3xl md:text-4xl text-center text-wedding-olive mb-8 uppercase tracking-[0.3em]" style={{ fontFamily: "'Lovely May', serif" }}>
            Lördag
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6">
            {saturdayEvents.map((event, index) => (
              <WavyEventCard 
                key={index}
                visible={visible}
                delay={event.delay}
                className="min-h-[200px]"
              >
                <h4 className="text-2xl md:text-3xl text-primary mb-2" style={{ fontFamily: "'Brittany', cursive" }}>
                  {event.title}
                </h4>
                <p className="text-base font-bold text-wedding-olive mb-3 uppercase tracking-wide">
                  {event.time}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-[260px] mx-auto">
                  {event.description}
                </p>
              </WavyEventCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
