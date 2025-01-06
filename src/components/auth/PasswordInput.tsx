import { useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";
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
        <p className="text-base text-muted-foreground mt-2">
          Password must be at least 8 characters and include uppercase, lowercase, and numbers.
        </p>
      )}
      
      {/* Password requirements as chips */}
      {id === "password" && value && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {!hasMinLength && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-sm bg-red-100 text-red-700">
              <X className="h-2.5 w-2.5" />
              <span>8+ Characters</span>
            </div>
          )}
          
          {!hasUpperCase && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-sm bg-red-100 text-red-700">
              <X className="h-2.5 w-2.5" />
              <span>Uppercase</span>
            </div>
          )}
          
          {!hasLowerCase && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-sm bg-red-100 text-red-700">
              <X className="h-2.5 w-2.5" />
              <span>Lowercase</span>
            </div>
          )}
          
          {!hasNumber && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-sm bg-red-100 text-red-700">
              <X className="h-2.5 w-2.5" />
              <span>Number</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};