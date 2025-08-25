import WeddingNavigation from "@/components/WeddingNavigation";
import WeddingHero from "@/components/WeddingHero";
import CountdownTimer from "@/components/CountdownTimer";
import TravelInfo from "@/components/TravelInfoUpdated";
import Timeline from "@/components/TimelineUpdated";
import RSVPForm from "@/components/RSVPFormUpdated";
import WeddingDetails from "@/components/WeddingDetails";
import ContactSection from "@/components/ContactSectionUpdated";
import PasswordGate from "@/components/PasswordGate";

const Index = () => {
  return (
    <div className="min-h-screen">
      <main>
        <section id="home">
          <WeddingHero />
        </section>
        <PasswordGate>
          <WeddingNavigation />
          <CountdownTimer />
          <TravelInfo />
          <Timeline />
          <RSVPForm />
          <WeddingDetails />
          <ContactSection />
        </PasswordGate>
      </main>
    </div>
  );
};

export default Index;
