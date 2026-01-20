import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface GuestDetails {
  name: string;
  dietary: string;
  mealChoice: string;
  shuttle: string;
}

const RSVPForm = () => {
  const { toast } = useToast();
  
  // Step 1: Are you coming?
  const [attending, setAttending] = useState<string>("");
  
  // Main guest details
  const [mainGuest, setMainGuest] = useState<GuestDetails>({
    name: "",
    dietary: "",
    mealChoice: "",
    shuttle: "",
  });
  const [email, setEmail] = useState("");
  
  // Plus one
  const [bringingPartner, setBringingPartner] = useState<string>("");
  const [partnerGuest, setPartnerGuest] = useState<GuestDetails>({
    name: "",
    dietary: "",
    mealChoice: "",
    shuttle: "",
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
          dietary: mainGuest.dietary,
          mealChoice: mainGuest.mealChoice,
          shuttle: mainGuest.shuttle,
          isMainGuest: true,
        }
      ];

      if (bringingPartner === "yes" && partnerGuest.name) {
        guests.push({
          name: partnerGuest.name,
          dietary: partnerGuest.dietary,
          mealChoice: partnerGuest.mealChoice,
          shuttle: partnerGuest.shuttle,
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
      setMainGuest({ name: "", dietary: "", mealChoice: "", shuttle: "" });
      setEmail("");
      setBringingPartner("");
      setPartnerGuest({ name: "", dietary: "", mealChoice: "", shuttle: "" });
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
    <div className="mb-6">
      <h3 className="font-serif font-bold text-lg text-primary mb-2">
        {children}
      </h3>
      <div className="h-px bg-primary/20 w-full"></div>
    </div>
  );

  // Styled input wrapper with consistent styling
  const inputStyles = "font-serif bg-background border-primary/20 rounded-lg focus:border-primary focus:ring-primary/20";

  const renderGuestFields = (
    guest: GuestDetails,
    setGuest: React.Dispatch<React.SetStateAction<GuestDetails>>,
    prefix: string,
    label: string
  ) => (
    <Card className="border-primary/10 bg-card/50 shadow-none animate-fade-in">
      <CardContent className="pt-6 space-y-6">
        <SectionHeader>{label}</SectionHeader>
        
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor={`${prefix}-name`} className="font-serif font-bold text-foreground">
            Namn <span className="text-primary">*</span>
          </Label>
          <Input
            id={`${prefix}-name`}
            value={guest.name}
            onChange={(e) => setGuest({ ...guest, name: e.target.value })}
            placeholder="Ditt namn"
            className={inputStyles}
          />
        </div>

        {/* Dietary */}
        <div className="space-y-2">
          <Label htmlFor={`${prefix}-dietary`} className="font-serif font-bold text-foreground">
            Allergier och specialkost
          </Label>
          <Textarea
            id={`${prefix}-dietary`}
            value={guest.dietary}
            onChange={(e) => setGuest({ ...guest, dietary: e.target.value })}
            placeholder="Ange eventuella allergier eller kostpreferenser"
            className={`${inputStyles} min-h-[80px]`}
          />
        </div>

        {/* Meal Choice */}
        <div className="space-y-4">
          <Label className="font-serif font-bold text-foreground">Måltidsval</Label>
          <RadioGroup 
            value={guest.mealChoice} 
            onValueChange={(value) => setGuest({ ...guest, mealChoice: value })}
            className="grid grid-cols-2 gap-3"
          >
            {[
              { value: "meat", label: "Kött" },
              { value: "fish", label: "Fisk" },
              { value: "vegetarian", label: "Vegetarisk" },
              { value: "vegan", label: "Vegansk" },
            ].map((option) => (
              <div 
                key={option.value}
                className="flex items-center space-x-3 p-3 rounded-lg border border-primary/10 hover:border-primary/30 hover:bg-muted/30 transition-all cursor-pointer"
              >
                <RadioGroupItem value={option.value} id={`${prefix}-${option.value}`} />
                <Label htmlFor={`${prefix}-${option.value}`} className="font-serif cursor-pointer flex-1">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Shuttle */}
        <div className="space-y-4">
          <Label className="font-serif font-bold text-foreground">Vill du åka med pendlingsbussen?</Label>
          <RadioGroup 
            value={guest.shuttle} 
            onValueChange={(value) => setGuest({ ...guest, shuttle: value })}
            className="grid grid-cols-2 gap-3"
          >
            {[
              { value: "both", label: "Ja, tur och retur" },
              { value: "to", label: "Bara dit" },
              { value: "from", label: "Bara hem" },
              { value: "no", label: "Nej tack" },
            ].map((option) => (
              <div 
                key={option.value}
                className="flex items-center space-x-3 p-3 rounded-lg border border-primary/10 hover:border-primary/30 hover:bg-muted/30 transition-all cursor-pointer"
              >
                <RadioGroupItem value={option.value} id={`${prefix}-shuttle-${option.value}`} />
                <Label htmlFor={`${prefix}-shuttle-${option.value}`} className="font-serif cursor-pointer flex-1">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section id="rsvp" className="py-20 bg-wedding-sage">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-script text-4xl md:text-5xl font-bold text-primary mb-4 uppercase tracking-wider">
            OSA
          </h2>
          <div className="w-24 h-px bg-primary mx-auto mb-6"></div>
          <p className="font-serif text-lg text-muted-foreground">
            Vänligen svara senast den 1 april 2026
          </p>
        </div>

        {/* Main Form Card */}
        <Card className="shadow-elegant border-primary/10 overflow-hidden">
          <CardContent className="p-8 space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Attendance Section */}
              <div className="space-y-6">
                <SectionHeader>Kommer du?</SectionHeader>
                <RadioGroup value={attending} onValueChange={setAttending} className="space-y-3">
                  {[
                    { value: "yes", label: "Ja, jag kommer" },
                    { value: "no", label: "Nej, jag kan tyvärr inte komma" },
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

              {/* If attending YES - show expanded form */}
              {attending === "yes" && (
                <div className="space-y-8 animate-fade-in">
                  
                  {/* Contact Section */}
                  <div className="space-y-6">
                    <SectionHeader>Kontaktuppgifter</SectionHeader>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-serif font-bold text-foreground">
                        E-post <span className="text-primary">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="din@epost.se"
                        className={inputStyles}
                      />
                    </div>
                  </div>

                  {/* Main Guest Details */}
                  {renderGuestFields(mainGuest, setMainGuest, "main", "Dina uppgifter")}

                  {/* Bringing Partner Section */}
                  <div className="space-y-6">
                    <SectionHeader>Tar du med dig en partner?</SectionHeader>
                    <RadioGroup value={bringingPartner} onValueChange={setBringingPartner} className="space-y-3">
                      {[
                        { value: "yes", label: "Ja" },
                        { value: "no", label: "Nej" },
                      ].map((option) => (
                        <div 
                          key={option.value}
                          className={`flex items-center space-x-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                            bringingPartner === option.value 
                              ? "border-primary bg-primary/5" 
                              : "border-primary/10 hover:border-primary/30 hover:bg-muted/30"
                          }`}
                        >
                          <RadioGroupItem value={option.value} id={`partner-${option.value}`} />
                          <Label 
                            htmlFor={`partner-${option.value}`} 
                            className="font-serif text-base cursor-pointer flex-1"
                          >
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Partner Guest Details */}
                  {bringingPartner === "yes" && renderGuestFields(partnerGuest, setPartnerGuest, "partner", "Partnerns uppgifter")}

                  {/* Extras Section */}
                  <Card className="border-primary/10 bg-card/50 shadow-none">
                    <CardContent className="pt-6 space-y-6">
                      <SectionHeader>Övrigt</SectionHeader>
                      
                      {/* Song Request */}
                      <div className="space-y-2">
                        <Label htmlFor="song" className="font-serif font-bold text-foreground">
                          Önska en låt
                        </Label>
                        <Input
                          id="song"
                          value={songRequest}
                          onChange={(e) => setSongRequest(e.target.value)}
                          placeholder="Vilken låt får dig att dansa?"
                          className={inputStyles}
                        />
                      </div>

                      {/* Message */}
                      <div className="space-y-2">
                        <Label htmlFor="message" className="font-serif font-bold text-foreground">
                          Meddelande till oss
                        </Label>
                        <Textarea
                          id="message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Något du vill berätta för oss?"
                          className={`${inputStyles} min-h-[100px]`}
                        />
                      </div>
                    </CardContent>
                  </Card>
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
                    {isSubmitting ? "Skickar..." : "Skicka OSA"}
                  </Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RSVPForm;
