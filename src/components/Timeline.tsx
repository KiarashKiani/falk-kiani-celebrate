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
    {/* White background - bottom layer */}
    <div className="absolute inset-0 bg-white" style={{ margin: '8%', borderRadius: '8px' }}></div>
    
    {/* Wavy border image frame - on top */}
    <img 
      src={wavyBorder} 
      alt="" 
      className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
      aria-hidden="true"
    />
    
    {/* Content - highest layer */}
    <div className="relative z-20 px-8 py-10 text-center h-full flex flex-col justify-center">
      {children}
    </div>
  </div>
);

// Day header with horizontal lines
const DayHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center justify-center gap-4 mb-10">
    <div className="h-px w-16 bg-wedding-olive"></div>
    <h3 className="text-xl md:text-2xl text-wedding-olive uppercase tracking-[0.3em]" style={{ fontFamily: "'Lovely May', serif" }}>
      {children}
    </h3>
    <div className="h-px w-16 bg-wedding-olive"></div>
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

  const fridayEvent = {
    title: "Meet & Greet",
    time: "6:00 PM",
    description: "Relaxed meet and greet with drinks and light bites. A perfect chance to meet other guests before the big day.",
    delay: "0ms"
  };

  const saturdayEvents = [
    {
      title: "Ceremony",
      time: "3:00 PM",
      description: "The wedding ceremony will be held in the beautiful apple orchard at Nybynäs Gård.",
      delay: "100ms"
    },
    {
      title: "Dinner & Party",
      time: "5:00 PM",
      description: "Wedding dinner followed by dancing and celebration late into the evening.",
      delay: "200ms"
    },
    {
      title: "Dancing & Music",
      time: "9:00 PM",
      description: "DJ and dance floor open. Come and dance the night away!",
      delay: "300ms"
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
        <div className="mb-20" ref={sectionRef}>
          <DayHeader>Friday</DayHeader>
          <div className="flex justify-center">
            <WavyEventCard 
              visible={visible}
              delay={fridayEvent.delay}
              className="w-full max-w-lg min-h-[220px]"
            >
              <h4 className="text-3xl md:text-4xl text-wedding-olive mb-2" style={{ fontFamily: "'Lovely May', serif" }}>
                {fridayEvent.title}
              </h4>
              <p className="text-lg font-bold text-wedding-olive mb-4 uppercase tracking-wide">
                {fridayEvent.time}
              </p>
              <p className="text-muted-foreground text-base leading-relaxed max-w-[320px] mx-auto">
                {fridayEvent.description}
              </p>
            </WavyEventCard>
          </div>
        </div>

        {/* Saturday Section */}
        <div>
          <DayHeader>Saturday</DayHeader>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {saturdayEvents.map((event, index) => (
              <WavyEventCard 
                key={index}
                visible={visible}
                delay={event.delay}
                className="min-h-[220px]"
              >
                <h4 className="text-2xl md:text-3xl text-wedding-olive mb-2" style={{ fontFamily: "'Lovely May', serif" }}>
                  {event.title}
                </h4>
                <p className="text-base font-bold text-wedding-olive mb-3 uppercase tracking-wide">
                  {event.time}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
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
