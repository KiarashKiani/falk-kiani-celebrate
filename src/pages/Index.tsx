import WeddingNavigation from "@/components/WeddingNavigation";
import WeddingHero from "@/components/WeddingHero";
import CountdownTimer from "@/components/CountdownTimer";
import Timeline from "@/components/TimelineUpdated";
import RSVPForm from "@/components/RSVPFormUpdated";
import WeddingDetails from "@/components/WeddingDetails";
import ContactSection from "@/components/ContactSectionUpdated";
import PasswordGate from "@/components/PasswordGate";
import MusicPlayer from "@/components/MusicPlayer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <main>
        <section id="home">
          <WeddingHero />
        </section>
        <PasswordGate>
          <MusicPlayer />
          <WeddingNavigation />
          <CountdownTimer />
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
