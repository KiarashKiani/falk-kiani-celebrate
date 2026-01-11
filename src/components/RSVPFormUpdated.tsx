import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { useToast } from "./ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

const RSVPForm = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [attending, setAttending] = useState("");
  const [names, setNames] = useState("");
  const [email, setEmail] = useState("");
  const [plusOne, setPlusOne] = useState(false);
  const [dietary, setDietary] = useState("");
  const [mealChoice, setMealChoice] = useState("");
  const [shuttle, setShuttle] = useState("");
  const [songRequest, setSongRequest] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!attending || !names || !email) {
      toast({
        title: t("rsvp.error"),
        variant: "destructive",
      });
      return;
    }

    if (email && !/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: t("rsvp.email.invalid"),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke("send-rsvp-emails", {
        body: {
          names,
          email,
          attending,
          plusOne,
          dietary,
          mealChoice,
          shuttle,
          songRequest,
          message,
          language,
        },
      });

      if (error) {
        console.error("Error sending RSVP:", error);
        toast({
          title: t("rsvp.error"),
          variant: "destructive",
        });
        return;
      }

      console.log("RSVP sent successfully:", data);
      toast({
        title: t("rsvp.success"),
      });

      // Reset form
      setAttending("");
      setNames("");
      setEmail("");
      setPlusOne(false);
      setDietary("");
      setMealChoice("");
      setShuttle("");
      setSongRequest("");
      setMessage("");
    } catch (err) {
      console.error("Error submitting RSVP:", err);
      toast({
        title: t("rsvp.error"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="py-20 bg-wedding-sage">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-script text-4xl md:text-5xl font-bold text-primary mb-4">
            {t("rsvp.title")}
          </h2>
          <div className="w-24 h-px bg-primary mx-auto mb-6"></div>
          <p className="font-serif text-lg text-muted-foreground">
            {t("rsvp.subtitle")}
          </p>
        </div>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="font-script text-2xl text-center text-primary">
              {t("rsvp.title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Attending */}
              <div className="space-y-3">
                <Label className="font-serif text-lg">{t("rsvp.attending")}</Label>
                <RadioGroup value={attending} onValueChange={setAttending}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes" className="font-serif">{t("rsvp.attending.yes")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no" className="font-serif">{t("rsvp.attending.no")}</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Names */}
              <div className="space-y-2">
                <Label htmlFor="names" className="font-serif">{t("rsvp.names")}</Label>
                <Input
                  id="names"
                  value={names}
                  onChange={(e) => setNames(e.target.value)}
                  placeholder={t("rsvp.names.placeholder")}
                  className="font-serif"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="font-serif">{t("rsvp.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("rsvp.email.placeholder")}
                  className="font-serif"
                />
              </div>

              {/* Plus One */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="plusOne"
                  checked={plusOne}
                  onCheckedChange={(checked) => setPlusOne(checked as boolean)}
                />
                <Label htmlFor="plusOne" className="font-serif">{t("rsvp.plusOne")}</Label>
              </div>

              {/* Dietary Requirements */}
              <div className="space-y-2">
                <Label htmlFor="dietary" className="font-serif">{t("rsvp.dietary")}</Label>
                <Textarea
                  id="dietary"
                  value={dietary}
                  onChange={(e) => setDietary(e.target.value)}
                  placeholder={t("rsvp.dietary.placeholder")}
                  className="font-serif"
                />
              </div>

              {/* Meal Choice */}
              <div className="space-y-3">
                <Label className="font-serif text-lg">{t("rsvp.meal")}</Label>
                <RadioGroup value={mealChoice} onValueChange={setMealChoice}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="meat" id="meat" />
                    <Label htmlFor="meat" className="font-serif">{t("rsvp.meal.meat")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fish" id="fish" />
                    <Label htmlFor="fish" className="font-serif">{t("rsvp.meal.fish")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="vegetarian" id="vegetarian" />
                    <Label htmlFor="vegetarian" className="font-serif">{t("rsvp.meal.vegetarian")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="vegan" id="vegan" />
                    <Label htmlFor="vegan" className="font-serif">{t("rsvp.meal.vegan")}</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Shuttle */}
              <div className="space-y-3">
                <Label className="font-serif text-lg">{t("rsvp.shuttle")}</Label>
                <RadioGroup value={shuttle} onValueChange={setShuttle}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="both" id="both" />
                    <Label htmlFor="both" className="font-serif">{t("rsvp.shuttle.both")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="to" id="to" />
                    <Label htmlFor="to" className="font-serif">{t("rsvp.shuttle.to")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="from" id="from" />
                    <Label htmlFor="from" className="font-serif">{t("rsvp.shuttle.from")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="shuttle-no" />
                    <Label htmlFor="shuttle-no" className="font-serif">{t("rsvp.shuttle.no")}</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Song Request */}
              <div className="space-y-2">
                <Label htmlFor="song" className="font-serif">{t("rsvp.song")}</Label>
                <Input
                  id="song"
                  value={songRequest}
                  onChange={(e) => setSongRequest(e.target.value)}
                  placeholder={t("rsvp.song.placeholder")}
                  className="font-serif"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="font-serif">{t("rsvp.message")}</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t("rsvp.message.placeholder")}
                  className="font-serif"
                />
              </div>

              <Button type="submit" className="w-full font-serif" disabled={isSubmitting}>
                {isSubmitting ? "..." : t("rsvp.submit")}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RSVPForm;