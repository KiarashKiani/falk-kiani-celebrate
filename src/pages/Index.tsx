import WeddingNavigation from "@/components/WeddingNavigation";
import WeddingHero from "@/components/WeddingHero";
import CountdownTimer from "@/components/CountdownTimer";
import TravelInfo from "@/components/TravelInfo";
import Timeline from "@/components/Timeline";
import RSVPForm from "@/components/RSVPForm";
import WeddingDetails from "@/components/WeddingDetails";
import ClothingCode from "@/components/ClothingCode";
import ContactSection from "@/components/ContactSection";
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
          <ClothingCode />
          <ContactSection />
        </PasswordGate>
      </main>
    </div>
  );
};

export default Index;
