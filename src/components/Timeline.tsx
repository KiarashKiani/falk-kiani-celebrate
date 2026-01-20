import { Clock, Coffee, Heart, Music } from "lucide-react";

const Timeline = () => {
  const events = [
    {
      day: "Fredag 17 september",
      title: "Meet & Greet",
      time: "18:00",
      description: "En avslappnad kväll för att träffa varandra innan den stora dagen",
      icon: Coffee,
      color: "text-wedding-sage"
    },
    {
      day: "Lördag 18 september",
      title: "Vigselceremoni",
      time: "15:00",
      description: "Vi säger ja till varandra i äppellunden",
      icon: Heart,
      color: "text-primary"
    },
    {
      day: "",
      title: "Skål & Mingel",
      time: "16:00",
      description: "Champagne och gratulationer efter ceremonin",
      icon: Coffee,
      color: "text-wedding-gold"
    },
    {
      day: "",
      title: "Bröllopsmiddag",
      time: "17:30",
      description: "Festmiddag i Magasinet med tal och skratt",
      icon: Coffee,
      color: "text-wedding-blush"
    },
    {
      day: "",
      title: "Fest & Dans",
      time: "20:00",
      description: "Nu dansar vi natten lång!",
      icon: Music,
      color: "text-primary"
    }
  ];

  return (
    <section id="timeline" className="py-20 bg-gradient-romantic">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-normal text-primary mb-4 uppercase tracking-wider" style={{ fontFamily: "'Lovely May', serif" }}>
            Schema för helgen
          </h2>
          <div className="w-24 h-px bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground">
            Så här ser vår bröllopshelg ut – vi hoppas ni kan vara med på allt!
          </p>
        </div>

        <div className="space-y-8">
          {events.map((event, index) => (
            <div key={index} className="flex items-start space-x-6">
              <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-card flex items-center justify-center shadow-soft ${event.color}`}>
                <event.icon className="w-6 h-6" />
              </div>
              
              <div className="flex-1 bg-card rounded-2xl p-6 shadow-soft">
                {event.day && (
                  <h3 className="text-lg font-bold text-primary mb-2">
                    {event.day}
                  </h3>
                )}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <h4 className="text-xl font-bold text-primary">
                    {event.title}
                  </h4>
                  <div className="flex items-center text-muted-foreground mt-1 md:mt-0">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{event.time}</span>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;