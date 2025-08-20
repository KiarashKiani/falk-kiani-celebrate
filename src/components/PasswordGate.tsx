import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, Heart } from "lucide-react";

interface PasswordGateProps {
  children: React.ReactNode;
}

const PasswordGate = ({ children }: PasswordGateProps) => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const CORRECT_PASSWORD = "KimjaJohanna";

  useEffect(() => {
    // Check if user is already authenticated
    const stored = localStorage.getItem("wedding-authenticated");
    if (stored === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem("wedding-authenticated", "true");
      setError("");
    } else {
      setError("Fel lösenord. Försök igen.");
      setPassword("");
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gradient-romantic flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-elegant">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-script text-primary">
            Välkommen till vårt bröllop
          </CardTitle>
          <p className="text-muted-foreground">
            För att se mer detaljerad information behöver du ange lösenordet
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Ange lösenord"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-center"
              />
              {error && (
                <p className="text-destructive text-sm text-center">{error}</p>
              )}
            </div>
            <Button type="submit" className="w-full">
              <Heart className="w-4 h-4 mr-2" />
              Fortsätt
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PasswordGate;