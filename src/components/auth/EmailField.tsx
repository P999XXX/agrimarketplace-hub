import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface EmailFieldProps {
  email: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const EmailField = ({ email, onChange }: EmailFieldProps) => {
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    // Basis E-Mail Format überprüfen
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9][a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
    
    if (!emailRegex.test(email)) {
      return false;
    }

    // E-Mail-Teile extrahieren
    const [localPart, domain] = email.split('@');
    const [domainName, tld] = domain.split('.');

    // Überprüfe Mindestlängen und zusätzliche Regeln
    if (localPart.length < 3) return false;
    if (domainName.length < 3) return false;
    if (tld.length < 3) return false;
    
    // Überprüfe auf ungültige Zeichenfolgen
    if (/[^a-zA-Z0-9]/.test(domainName)) return false;
    if (/[^a-zA-Z]/.test(tld)) return false;

    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    if (newEmail && !validateEmail(newEmail)) {
      setError("Bitte geben Sie eine gültige E-Mail-Adresse ein (z.B. name@example.com)");
    } else {
      setError(null);
    }
    onChange(e);
  };

  return (
    <div className="space-y-1">
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        name="email"
        type="email"
        placeholder="your@example.com"
        required
        value={email}
        onChange={handleChange}
        autoComplete="new-email"
        data-1p-ignore
        className={error ? "border-red-500" : ""}
      />
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};