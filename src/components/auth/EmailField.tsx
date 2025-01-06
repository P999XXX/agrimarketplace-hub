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
    return email.includes('@');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    if (newEmail && !validateEmail(newEmail)) {
      setError("Bitte geben Sie eine E-Mail-Adresse mit @ ein");
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