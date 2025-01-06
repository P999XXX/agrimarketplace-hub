import { X } from "lucide-react";

interface PasswordValidationChipsProps {
  value: string;
}

export const PasswordValidationChips = ({ value }: PasswordValidationChipsProps) => {
  const hasMinLength = value.length >= 8;
  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasNumber = /\d/.test(value);

  if (!value) return null;

  return (
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
  );
};