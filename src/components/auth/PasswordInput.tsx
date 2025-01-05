import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PasswordInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const PasswordInput = ({
  id,
  label,
  value,
  onChange,
  placeholder,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  // Passwort-Validierungen
  const hasMinLength = value.length >= 8;
  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasNumber = /\d/.test(value);

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          name={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          required
          value={value}
          onChange={onChange}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
      
      {/* Passwort-Anforderungen */}
      {id === "password" && value && (
        <div className="space-y-1 text-sm">
          <p className={`${hasMinLength ? 'text-green-600' : 'text-red-600'}`}>
            • Mindestens 8 Zeichen
          </p>
          <p className={`${hasUpperCase ? 'text-green-600' : 'text-red-600'}`}>
            • Mindestens ein Großbuchstabe
          </p>
          <p className={`${hasLowerCase ? 'text-green-600' : 'text-red-600'}`}>
            • Mindestens ein Kleinbuchstabe
          </p>
          <p className={`${hasNumber ? 'text-green-600' : 'text-red-600'}`}>
            • Mindestens eine Zahl
          </p>
        </div>
      )}
    </div>
  );
};