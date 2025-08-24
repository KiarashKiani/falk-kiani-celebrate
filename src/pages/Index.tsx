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
          <div className="relative">
            <Carousel className="w-full" opts={{ align: "start", loop: true }}>
              <CarouselContent>
                <CarouselItem>
                  <div className="min-h-screen">
                    <WeddingNavigation />
                    <CountdownTimer />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="min-h-screen">
                    <TravelInfo />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="min-h-screen">
                    <Timeline />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="min-h-screen">
                    <RSVPForm />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="min-h-screen">
                    <WeddingDetails />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="min-h-screen">
                    <ContactSection />
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          </div>
        </PasswordGate>
      </main>
    </div>
  );
};

export default Index;
