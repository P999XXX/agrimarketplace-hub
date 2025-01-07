import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordToggle } from "./PasswordToggle";
import { PasswordValidationChips } from "./PasswordValidationChips";

interface PasswordInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onValidationChange?: (isValid: boolean) => void;
}

export const PasswordInput = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  onValidationChange,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  // Password validations
  const hasMinLength = value.length >= 8;
  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasNumber = /\d/.test(value);

  // Check if all password requirements are met
  const isPasswordValid = hasMinLength && hasUpperCase && hasLowerCase && hasNumber;

  // Notify parent component about validation status changes
  if (onValidationChange && id === "password") {
    onValidationChange(isPasswordValid);
  }

  return (
    <div className="space-y-1">
      <Label htmlFor={id} className="text-white md:text-foreground">{label}</Label>
      <div className="relative">
        <Input
          id={id}
          name={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          required
          value={value}
          onChange={onChange}
          autoComplete="new-password"
          data-1p-ignore
        />
        <PasswordToggle 
          showPassword={showPassword}
          onToggle={() => setShowPassword(!showPassword)}
        />
      </div>
      
      {/* Password description - only show on sign up */}
      {id === "password" && onValidationChange && (
        <p className="text-[0.85rem] leading-4 text-white/80 md:text-muted-foreground mt-2">
          Password must be at least 8 characters and include uppercase, lowercase, and numbers.
        </p>
      )}
      
      {/* Password requirements as chips - only show on sign up */}
      {id === "password" && onValidationChange && <PasswordValidationChips value={value} />}
    </div>
  );
};