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

  const renderGuestFields = (
    guest: GuestDetails,
    setGuest: React.Dispatch<React.SetStateAction<GuestDetails>>,
    prefix: string,
    label: string
  ) => (
    <div className="space-y-6 p-6 bg-muted/30 rounded-lg animate-fade-in">
      <h3 className="font-script text-xl text-primary border-b border-primary/20 pb-2">
        {label}
      </h3>
      
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor={`${prefix}-name`} className="font-serif">
          Namn *
        </Label>
        <Input
          id={`${prefix}-name`}
          value={guest.name}
          onChange={(e) => setGuest({ ...guest, name: e.target.value })}
          placeholder="Ditt namn"
          className="font-serif"
        />
      </div>

      {/* Dietary */}
      <div className="space-y-2">
        <Label htmlFor={`${prefix}-dietary`} className="font-serif">
          Allergier och specialkost
        </Label>
        <Textarea
          id={`${prefix}-dietary`}
          value={guest.dietary}
          onChange={(e) => setGuest({ ...guest, dietary: e.target.value })}
          placeholder="Ange eventuella allergier eller kostpreferenser"
          className="font-serif"
        />
      </div>

      {/* Meal Choice */}
      <div className="space-y-3">
        <Label className="font-serif">Måltidsval</Label>
        <RadioGroup 
          value={guest.mealChoice} 
          onValueChange={(value) => setGuest({ ...guest, mealChoice: value })}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="meat" id={`${prefix}-meat`} />
            <Label htmlFor={`${prefix}-meat`} className="font-serif">Kött</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="fish" id={`${prefix}-fish`} />
            <Label htmlFor={`${prefix}-fish`} className="font-serif">Fisk</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="vegetarian" id={`${prefix}-vegetarian`} />
            <Label htmlFor={`${prefix}-vegetarian`} className="font-serif">Vegetarisk</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="vegan" id={`${prefix}-vegan`} />
            <Label htmlFor={`${prefix}-vegan`} className="font-serif">Vegansk</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Shuttle */}
      <div className="space-y-3">
        <Label className="font-serif">Vill du åka med pendlingsbussen?</Label>
        <RadioGroup 
          value={guest.shuttle} 
          onValueChange={(value) => setGuest({ ...guest, shuttle: value })}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="both" id={`${prefix}-shuttle-both`} />
            <Label htmlFor={`${prefix}-shuttle-both`} className="font-serif">Ja, tur och retur</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="to" id={`${prefix}-shuttle-to`} />
            <Label htmlFor={`${prefix}-shuttle-to`} className="font-serif">Bara dit</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="from" id={`${prefix}-shuttle-from`} />
            <Label htmlFor={`${prefix}-shuttle-from`} className="font-serif">Bara hem</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id={`${prefix}-shuttle-no`} />
            <Label htmlFor={`${prefix}-shuttle-no`} className="font-serif">Nej tack</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );

  return (
    <section id="rsvp" className="py-20 bg-wedding-sage">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-script text-4xl md:text-5xl font-bold text-primary mb-4">
            OSA
          </h2>
          <div className="w-24 h-px bg-primary mx-auto mb-6"></div>
          <p className="font-serif text-lg text-muted-foreground">
            Vänligen svara senast den 1 april 2026
          </p>
        </div>

        <Card className="shadow-soft">
          <CardContent className="pt-6 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Are you coming? */}
              <div className="space-y-4">
                <Label className="font-serif text-lg">Kommer du?</Label>
                <RadioGroup value={attending} onValueChange={setAttending}>
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="yes" id="attending-yes" />
                    <Label htmlFor="attending-yes" className="font-serif cursor-pointer flex-1">
                      Ja, jag kommer
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="no" id="attending-no" />
                    <Label htmlFor="attending-no" className="font-serif cursor-pointer flex-1">
                      Nej, jag kan tyvärr inte komma
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* If attending YES - show expanded form */}
              {attending === "yes" && (
                <div className="space-y-6 animate-fade-in">
                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-serif">
                      E-post *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="din@epost.se"
                      className="font-serif"
                    />
                  </div>

                  {/* Main Guest Details */}
                  {renderGuestFields(mainGuest, setMainGuest, "main", "Dina uppgifter")}

                  {/* Bringing Partner? */}
                  <div className="space-y-4">
                    <Label className="font-serif text-lg">Tar du med dig en partner?</Label>
                    <RadioGroup value={bringingPartner} onValueChange={setBringingPartner}>
                      <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value="yes" id="partner-yes" />
                        <Label htmlFor="partner-yes" className="font-serif cursor-pointer flex-1">
                          Ja
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value="no" id="partner-no" />
                        <Label htmlFor="partner-no" className="font-serif cursor-pointer flex-1">
                          Nej
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Partner Guest Details */}
                  {bringingPartner === "yes" && renderGuestFields(partnerGuest, setPartnerGuest, "partner", "Partnerns uppgifter")}

                  {/* Song Request */}
                  <div className="space-y-2">
                    <Label htmlFor="song" className="font-serif">
                      Önska en låt
                    </Label>
                    <Input
                      id="song"
                      value={songRequest}
                      onChange={(e) => setSongRequest(e.target.value)}
                      placeholder="Vilken låt får dig att dansa?"
                      className="font-serif"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="font-serif">
                      Meddelande till oss
                    </Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Något du vill berätta för oss?"
                      className="font-serif"
                    />
                  </div>
                </div>
              )}

              {/* Submit Button - always visible after initial selection */}
              {attending && (
                <div className="animate-fade-in">
                  <Button 
                    type="submit" 
                    className="w-full font-serif text-lg py-6" 
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