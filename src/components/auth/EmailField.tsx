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
    // Strengere E-Mail-Validierung
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9][a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!emailRegex.test(email)) {
      return false;
    }

    // Überprüfe Mindestlängen
    const [localPart, domain] = email.split('@');
    if (localPart.length < 2 || domain.length < 4) {
      return false;
    }

    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    if (newEmail && !validateEmail(newEmail)) {
      setError("Please enter a valid email address (e.g., name@example.com)");
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