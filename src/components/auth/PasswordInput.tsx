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
      
      {/* Password requirements as chips */}
      {id === "password" && value && (
        <div className="flex flex-wrap gap-2 mt-2">
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
            hasMinLength ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {hasMinLength ? (
              <Check className="h-3 w-3" />
            ) : (
              <X className="h-3 w-3" />
            )}
            <span>8+ Zeichen</span>
          </div>
          
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
            hasUpperCase ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {hasUpperCase ? (
              <Check className="h-3 w-3" />
            ) : (
              <X className="h-3 w-3" />
            )}
            <span>Großbuchstabe</span>
          </div>
          
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
            hasLowerCase ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {hasLowerCase ? (
              <Check className="h-3 w-3" />
            ) : (
              <X className="h-3 w-3" />
            )}
            <span>Kleinbuchstabe</span>
          </div>
          
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
            hasNumber ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {hasNumber ? (
              <Check className="h-3 w-3" />
            ) : (
              <X className="h-3 w-3" />
            )}
            <span>Zahl</span>
          </div>
        </div>
      )}
    </div>
  );
};