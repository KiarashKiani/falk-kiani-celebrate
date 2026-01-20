import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useToast } from "@/hooks/use-toast";
import { Heart, Mail } from "lucide-react";

const RSVPForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    attending: '',
    names: '',
    email: '',
    address: '',
    dietary: '',
    mealChoice: '',
    plusOne: false,
    plusOneName: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.attending || !formData.names || !formData.email) {
      toast({
        title: "Vänligen fyll i alla obligatoriska fält",
        description: "Namn, e-post och närvaro är obligatoriska",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Tack för ditt svar!",
      description: "Vi har tagit emot er OSA. Vi ser fram emot att fira med er!",
    });
    
    // Reset form
    setFormData({
      attending: '',
      names: '',
      email: '',
      address: '',
      dietary: '',
      mealChoice: '',
      plusOne: false,
      plusOneName: ''
    });
  };

  return (
    <section id="rsvp" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <Heart className="w-12 h-12 mx-auto mb-6 text-primary" />
          <h2 className="text-4xl md:text-5xl font-normal text-primary mb-4 uppercase tracking-wider" style={{ fontFamily: "'Lovely May', serif" }}>
            OSA - Svara här
          </h2>
          <div className="w-24 h-px bg-primary mx-auto mb-6"></div>
          <p className="font-serif text-lg text-muted-foreground mb-4">
            Vi är tacksamma om ni svarar senast <span className="font-semibold text-primary">1 juni 2026</span>
          </p>
          <div className="bg-wedding-blush/50 rounded-lg p-4 inline-block">
            <p className="font-serif text-sm text-primary">
              💌 Deadline: 1 juni 2026
            </p>
          </div>
        </div>

        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center font-serif text-2xl">
              <Mail className="w-6 h-6 mr-3 text-primary" />
              Din anmälan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Attendance */}
              <div className="space-y-3">
                <Label className="font-serif text-lg font-semibold">Kan ni komma? *</Label>
                <RadioGroup 
                  value={formData.attending} 
                  onValueChange={(value) => setFormData({...formData, attending: value})}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes" className="font-serif">Ja, vi kommer gärna!</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no" className="font-serif">Tyvärr kan vi inte komma</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Names */}
              <div className="space-y-2">
                <Label htmlFor="names" className="font-serif font-semibold">Namn *</Label>
                <Input
                  id="names"
                  value={formData.names}
                  onChange={(e) => setFormData({...formData, names: e.target.value})}
                  placeholder="Era namn"
                  className="font-serif"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="font-serif font-semibold">E-post *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="er@email.se"
                  className="font-serif"
                />
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address" className="font-serif font-semibold">Postadress (för eventuella utskick)</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="Er postadress"
                  className="font-serif"
                />
              </div>

              {/* Plus One */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="plusOne"
                    checked={formData.plusOne}
                    onCheckedChange={(checked) => setFormData({...formData, plusOne: checked as boolean})}
                  />
                  <Label htmlFor="plusOne" className="font-serif">Jag tar med en +1</Label>
                </div>
                {formData.plusOne && (
                  <Input
                    value={formData.plusOneName}
                    onChange={(e) => setFormData({...formData, plusOneName: e.target.value})}
                    placeholder="Namn på +1"
                    className="font-serif"
                  />
                )}
              </div>

              {/* Dietary restrictions */}
              <div className="space-y-2">
                <Label htmlFor="dietary" className="font-serif font-semibold">Allergier eller specialkost</Label>
                <Textarea
                  id="dietary"
                  value={formData.dietary}
                  onChange={(e) => setFormData({...formData, dietary: e.target.value})}
                  placeholder="Berätta om eventuella allergier eller specialkost"
                  className="font-serif"
                />
              </div>

              {/* Meal choice */}
              <div className="space-y-3">
                <Label className="font-serif font-semibold">Föredragen måltid</Label>
                <RadioGroup 
                  value={formData.mealChoice} 
                  onValueChange={(value) => setFormData({...formData, mealChoice: value})}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="optionA" id="optionA" />
                    <Label htmlFor="optionA" className="font-serif">Alternativ A (kommer specificeras senare)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="optionB" id="optionB" />
                    <Label htmlFor="optionB" className="font-serif">Alternativ B (kommer specificeras senare)</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button 
                type="submit" 
                className="w-full font-serif text-lg py-6 bg-primary hover:bg-primary/90"
              >
                Skicka OSA
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RSVPForm;