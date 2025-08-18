import WeddingNavigation from "@/components/WeddingNavigation";
import WeddingHero from "@/components/WeddingHero";
import CountdownTimer from "@/components/CountdownTimer";
import TravelInfo from "@/components/TravelInfo";
import Timeline from "@/components/Timeline";
import RSVPForm from "@/components/RSVPForm";
import WeddingDetails from "@/components/WeddingDetails";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <WeddingNavigation />
      <main>
        <section id="home">
          <WeddingHero />
        </section>
        <CountdownTimer />
        <TravelInfo />
        <Timeline />
        <RSVPForm />
        <WeddingDetails />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;
