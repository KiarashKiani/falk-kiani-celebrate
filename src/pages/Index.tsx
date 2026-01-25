import { useState, useEffect } from "react";
import WeddingNavigation from "@/components/WeddingNavigation";
import WeddingHero from "@/components/WeddingHero";
import CountdownSection from "@/components/CountdownSection";
import Timeline from "@/components/TimelineUpdated";
import RSVPForm from "@/components/RSVPFormUpdated";
import WeddingDetails from "@/components/WeddingDetails";
import ContactSection from "@/components/ContactSectionUpdated";
import MusicPlayer from "@/components/MusicPlayer";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("wedding-authenticated");
    if (stored === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
  };

  // Show password gate on hero
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen">
        <main>
          <section id="home">
            <WeddingHero showPasswordInput={true} onAuthenticated={handleAuthenticated} />
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <main>
        <MusicPlayer />
        <WeddingNavigation />
        <section id="home">
          <WeddingHero />
        </section>
        <section id="countdown">
          <CountdownSection />
        </section>
        <section id="timeline">
          <Timeline />
        </section>
        <section id="details">
          <WeddingDetails />
        </section>
        <section id="rsvp">
          <RSVPForm />
        </section>
        <section id="contact">
          <ContactSection />
        </section>
      </main>
    </div>
  );
};

export default Index;
