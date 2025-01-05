import { useState } from "react";
import { Eye, EyeOff, Check, X } from "lucide-react";
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

  // Password validations
  const hasMinLength = value.length >= 8;
  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasNumber = /\d/.test(value);

  return (
    <div className="space-y-1">
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
      
      {/* Password description */}
      {id === "password" && (
        <p className="text-xs text-muted-foreground mt-1">
          Password must be at least 8 characters and include uppercase, lowercase, and numbers.
        </p>
      )}
      
      {/* Password requirements */}
      {id === "password" && value && (
        <div className="flex flex-wrap gap-3 text-[10px] mt-1.5">
          <div className="flex items-center gap-0.5">
            {hasMinLength ? (
              <Check className="h-2.5 w-2.5 text-green-600" />
            ) : (
              <X className="h-2.5 w-2.5 text-red-600" />
            )}
            <span className={hasMinLength ? "text-green-600" : "text-red-600"}>
              8+
            </span>
          </div>
          <div className="flex items-center gap-0.5">
            {hasUpperCase ? (
              <Check className="h-2.5 w-2.5 text-green-600" />
            ) : (
              <X className="h-2.5 w-2.5 text-red-600" />
            )}
            <span className={hasUpperCase ? "text-green-600" : "text-red-600"}>
              ABC
            </span>
          </div>
          <div className="flex items-center gap-0.5">
            {hasLowerCase ? (
              <Check className="h-2.5 w-2.5 text-green-600" />
            ) : (
              <X className="h-2.5 w-2.5 text-red-600" />
            )}
            <span className={hasLowerCase ? "text-green-600" : "text-red-600"}>
              abc
            </span>
          </div>
          <div className="flex items-center gap-0.5">
            {hasNumber ? (
              <Check className="h-2.5 w-2.5 text-green-600" />
            ) : (
              <X className="h-2.5 w-2.5 text-red-600" />
            )}
            <span className={hasNumber ? "text-green-600" : "text-red-600"}>
              123
            </span>
          </div>
        </div>
      )}
    </div>
  );
};