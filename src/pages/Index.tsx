import WeddingNavigation from "@/components/WeddingNavigation";
import WeddingHero from "@/components/WeddingHero";
import CountdownTimer from "@/components/CountdownTimer";
import TravelInfo from "@/components/TravelInfo";
import Timeline from "@/components/Timeline";
import RSVPForm from "@/components/RSVPForm";
import WeddingDetails from "@/components/WeddingDetails";
import ContactSection from "@/components/ContactSection";
import PasswordGate from "@/components/PasswordGate";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const Index = () => {
  return (
    <div className="min-h-screen">
      <main>
        <section id="home">
          <WeddingHero />
        </section>
        <PasswordGate>
          <div className="relative min-h-screen">
            <Carousel 
              className="w-full h-screen" 
              opts={{ 
                align: "start", 
                loop: true,
                dragFree: true,
                containScroll: "trimSnaps"
              }}
            >
              <CarouselContent className="h-screen">
                <CarouselItem className="h-screen">
                  <div className="h-full flex flex-col">
                    <WeddingNavigation />
                    <CountdownTimer />
                  </div>
                </CarouselItem>
                <CarouselItem className="h-screen">
                  <div className="h-full">
                    <TravelInfo />
                  </div>
                </CarouselItem>
                <CarouselItem className="h-screen">
                  <div className="h-full">
                    <Timeline />
                  </div>
                </CarouselItem>
                <CarouselItem className="h-screen">
                  <div className="h-full">
                    <RSVPForm />
                  </div>
                </CarouselItem>
                <CarouselItem className="h-screen">
                  <div className="h-full">
                    <WeddingDetails />
                  </div>
                </CarouselItem>
                <CarouselItem className="h-screen">
                  <div className="h-full">
                    <ContactSection />
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="left-4 z-50 bg-primary/20 border-primary/30 hover:bg-primary/30" />
              <CarouselNext className="right-4 z-50 bg-primary/20 border-primary/30 hover:bg-primary/30" />
            </Carousel>
          </div>
        </PasswordGate>
      </main>
    </div>
  );
};

export default Index;
