import { useState, useCallback } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import WavyBorderCard from "./ui/WavyBorderCard";

interface GuestDetails {
  name: string;
  attendanceDays: string;
  dietary: string;
}

const RSVPForm = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  
  // Step 1: Are you coming?
  const [attending, setAttending] = useState<string>("");
  
  // Main guest details
  const [mainGuest, setMainGuest] = useState<GuestDetails>({
    name: "",
    attendanceDays: "",
    dietary: "",
  });
  const [email, setEmail] = useState("");
  
  // Plus one
  const [bringingPartner, setBringingPartner] = useState<string>("");
  const [partnerGuest, setPartnerGuest] = useState<GuestDetails>({
    name: "",
    attendanceDays: "",
    dietary: "",
  });
  
  // Shared fields
  const [songRequest, setSongRequest] = useState("");
  const [message, setMessage] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!attending) {
      toast({
        title: "Välj om du kommer eller inte",
        variant: "destructive",
      });
      return;
    }

    if (attending === "yes") {
      if (!mainGuest.name.trim()) {
        toast({
          title: "Namn krävs",
          variant: "destructive",
        });
        return;
      }

      if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
        toast({
          title: "Giltig e-postadress krävs",
          variant: "destructive",
        });
        return;
      }

      if (bringingPartner === "yes" && !partnerGuest.name.trim()) {
        toast({
          title: "Partnerns namn krävs",
          variant: "destructive",
        });
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const guests = [
        {
          name: mainGuest.name,
          attendanceDays: mainGuest.attendanceDays,
          dietary: mainGuest.dietary,
          isMainGuest: true,
        }
      ];

      if (bringingPartner === "yes" && partnerGuest.name) {
        guests.push({
          name: partnerGuest.name,
          attendanceDays: partnerGuest.attendanceDays,
          dietary: partnerGuest.dietary,
          isMainGuest: false,
        });
      }

      const { error } = await supabase.functions.invoke("send-rsvp-emails", {
        body: {
          attending,
          email: attending === "yes" ? email : "",
          guests,
          songRequest,
          message,
        },
      });

      if (error) {
        console.error("Error sending RSVP:", error);
        toast({
          title: "Något gick fel. Försök igen.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: attending === "yes" 
          ? "Tack för din OSA! Vi har skickat en bekräftelse till din e-post."
          : "Tack för ditt svar. Vi beklagar att du inte kan komma.",
      });

      // Reset form
      setAttending("");
      setMainGuest({ name: "", attendanceDays: "", dietary: "" });
      setEmail("");
      setBringingPartner("");
      setPartnerGuest({ name: "", attendanceDays: "", dietary: "" });
      setSongRequest("");
      setMessage("");
    } catch (err) {
      console.error("Error submitting RSVP:", err);
      toast({
        title: "Något gick fel. Försök igen.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Section header component for consistent styling
  const SectionHeader = ({ children }: { children: React.ReactNode }) => (
    <div className="mb-6 text-center">
      <h3 className="font-serif font-bold text-lg text-primary mb-2">
        {children}
      </h3>
      <div className="h-px bg-gradient-to-r from-transparent via-wedding-olive/40 to-transparent w-24 mx-auto"></div>
    </div>
  );

  // Styled input wrapper with consistent styling
  const inputStyles = "font-serif bg-background border-primary/20 rounded-lg focus:border-primary focus:ring-primary/20";

  const renderGuestFields = (
    guest: GuestDetails,
    setGuest: React.Dispatch<React.SetStateAction<GuestDetails>>,
    prefix: string,
    label: string,
    delayMs: number = 0
  ) => (
    <WavyBorderCard className="min-h-[420px]" delay={`${delayMs}ms`}>
      <div className="space-y-6 text-left">
        <SectionHeader>{label}</SectionHeader>
        
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor={`${prefix}-name`} className="font-serif font-bold text-foreground">
            {t("rsvp.names")} <span className="text-primary">*</span>
          </Label>
          <Input
            id={`${prefix}-name`}
            value={guest.name}
            onChange={(e) => setGuest({ ...guest, name: e.target.value })}
            placeholder={prefix === "partner" ? t("rsvp.plusOne.name.placeholder") : t("rsvp.names.placeholder")}
            className={inputStyles}
          />
        </div>

        {/* Attendance Days */}
        <div className="space-y-3">
          <Label className="font-serif font-bold text-foreground">{t("rsvp.days")}</Label>
          <RadioGroup 
            value={guest.attendanceDays} 
            onValueChange={(value) => setGuest({ ...guest, attendanceDays: value })}
            className="grid grid-cols-1 gap-2"
          >
            {[
              { value: "both", label: t("rsvp.days.both") },
              { value: "saturday", label: t("rsvp.days.saturday") },
            ].map((option) => (
              <div 
                key={option.value}
                className="flex items-center space-x-2 p-2 rounded-lg border border-primary/10 hover:border-primary/30 hover:bg-muted/30 transition-all cursor-pointer"
              >
                <RadioGroupItem value={option.value} id={`${prefix}-days-${option.value}`} className="shrink-0" />
                <Label htmlFor={`${prefix}-days-${option.value}`} className="font-serif text-sm cursor-pointer flex-1">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Dietary */}
        <div className="space-y-2">
          <Label htmlFor={`${prefix}-dietary`} className="font-serif font-bold text-foreground">
            {t("rsvp.dietary")}
          </Label>
          <Textarea
            id={`${prefix}-dietary`}
            value={guest.dietary}
            onChange={(e) => setGuest({ ...guest, dietary: e.target.value })}
            placeholder={t("rsvp.dietary.placeholder")}
            className={`${inputStyles} min-h-[60px]`}
          />
        </div>

      </div>
    </WavyBorderCard>
  );

  return (
    <section id="rsvp" className="pt-8 pb-24" style={{ backgroundColor: '#fff9f1' }}>
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-brittany-heading text-5xl md:text-6xl font-normal mb-4" style={{ color: '#ff8a00' }}>
            {t("rsvp.title")}
          </h2>
          <p className="font-serif text-lg text-muted-foreground">
            {t("rsvp.subtitle").replace('[Datum]', '15 maj 2026').replace('[Date]', 'May 15, 2026')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Attendance Section */}
          <WavyBorderCard className="min-h-[180px]">
            <div className="space-y-6 text-left">
              <SectionHeader>{t("rsvp.attending")}</SectionHeader>
              <RadioGroup value={attending} onValueChange={setAttending} className="space-y-3">
                {[
                  { value: "yes", label: t("rsvp.attending.yes") },
                  { value: "no", label: t("rsvp.attending.no") },
                ].map((option) => (
                  <div 
                    key={option.value}
                    className={`flex items-center space-x-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      attending === option.value 
                        ? "border-primary bg-primary/5" 
                        : "border-primary/10 hover:border-primary/30 hover:bg-muted/30"
                    }`}
                  >
                    <RadioGroupItem value={option.value} id={`attending-${option.value}`} />
                    <Label 
                      htmlFor={`attending-${option.value}`} 
                      className="font-serif text-base cursor-pointer flex-1"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </WavyBorderCard>

          {/* If attending YES - show expanded form */}
          {attending === "yes" && (
            <div className="space-y-8 animate-fade-in">
              
              {/* Contact Section */}
              <WavyBorderCard className="min-h-[160px]" delay="100ms">
                <div className="space-y-6 text-left">
                  <SectionHeader>{t("rsvp.email")}</SectionHeader>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-serif font-bold text-foreground">
                      {t("rsvp.email")} <span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("rsvp.email.placeholder")}
                      className={inputStyles}
                    />
                  </div>
                </div>
              </WavyBorderCard>

              {/* Main Guest Details */}
              {renderGuestFields(mainGuest, setMainGuest, "main", t("rsvp.names"), 200)}

              {/* Bringing Partner - Accordion Toggle */}
              <WavyBorderCard className={bringingPartner === "yes" ? "min-h-[420px]" : "min-h-[80px]"} delay="300ms">
                <div className="space-y-6 text-left">
                  <button
                    type="button"
                    onClick={() => {
                      setBringingPartner(bringingPartner === "yes" ? "no" : "yes");
                      if (bringingPartner === "yes") {
                        setPartnerGuest({ name: "", attendanceDays: "", dietary: "" });
                      }
                    }}
                    className="w-full flex items-center justify-between group"
                  >
                    <h3 className="font-serif font-bold text-lg text-primary">
                      {t("rsvp.plusOne")}
                    </h3>
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${bringingPartner === "yes" ? "rotate-180" : ""}`}
                      style={{ backgroundColor: '#3f5f10' }}
                    >
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  <div className="h-px bg-gradient-to-r from-transparent via-wedding-olive/40 to-transparent w-24 mx-auto"></div>

                  {/* Partner fields revealed on expand */}
                  {bringingPartner === "yes" && (
                    <div className="space-y-6 animate-fade-in">
                      {/* Name */}
                      <div className="space-y-2">
                        <Label htmlFor="partner-name" className="font-serif font-bold text-foreground">
                          {t("rsvp.names")} <span className="text-primary">*</span>
                        </Label>
                        <Input
                          id="partner-name"
                          value={partnerGuest.name}
                          onChange={(e) => setPartnerGuest({ ...partnerGuest, name: e.target.value })}
                          placeholder={t("rsvp.plusOne.name.placeholder")}
                          className={inputStyles}
                        />
                      </div>

                      {/* Attendance Days */}
                      <div className="space-y-3">
                        <Label className="font-serif font-bold text-foreground">{t("rsvp.days")}</Label>
                        <RadioGroup 
                          value={partnerGuest.attendanceDays} 
                          onValueChange={(value) => setPartnerGuest({ ...partnerGuest, attendanceDays: value })}
                          className="grid grid-cols-1 gap-2"
                        >
                          {[
                            { value: "both", label: t("rsvp.days.both") },
                            { value: "saturday", label: t("rsvp.days.saturday") },
                          ].map((option) => (
                            <div 
                              key={option.value}
                              className="flex items-center space-x-2 p-2 rounded-lg border border-primary/10 hover:border-primary/30 hover:bg-muted/30 transition-all cursor-pointer"
                            >
                              <RadioGroupItem value={option.value} id={`partner-days-${option.value}`} className="shrink-0" />
                              <Label htmlFor={`partner-days-${option.value}`} className="font-serif text-sm cursor-pointer flex-1">
                                {option.label}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>

                      {/* Dietary */}
                      <div className="space-y-2">
                        <Label htmlFor="partner-dietary" className="font-serif font-bold text-foreground">
                          {t("rsvp.dietary")}
                        </Label>
                        <Textarea
                          id="partner-dietary"
                          value={partnerGuest.dietary}
                          onChange={(e) => setPartnerGuest({ ...partnerGuest, dietary: e.target.value })}
                          placeholder={t("rsvp.dietary.placeholder")}
                          className={`${inputStyles} min-h-[60px]`}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </WavyBorderCard>


               {/* Song Request Section */}
               <WavyBorderCard className="min-h-[160px]" delay="500ms">
                 <div className="space-y-6 text-left">
                   <SectionHeader>{t("rsvp.song")}</SectionHeader>
                   
                   {/* Song Request */}
                   <div className="space-y-2">
                     <Label htmlFor="song" className="font-serif font-bold text-foreground">
                       {t("rsvp.song")}
                     </Label>
                     <Input
                       id="song"
                       value={songRequest}
                       onChange={(e) => setSongRequest(e.target.value)}
                       placeholder={t("rsvp.song.placeholder")}
                       className={inputStyles}
                     />
                   </div>
                 </div>
               </WavyBorderCard>
            </div>
          )}

          {/* Submit Button */}
          {attending && (
            <div className="animate-fade-in pt-4">
              <Button 
                type="submit" 
                className="w-full font-serif text-lg py-6 rounded-xl bg-primary hover:bg-primary/90 transition-all shadow-md hover:shadow-lg" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "..." : t("rsvp.submit")}
              </Button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default RSVPForm;
