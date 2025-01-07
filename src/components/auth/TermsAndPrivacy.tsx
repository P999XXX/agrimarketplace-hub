import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface TermsAndPrivacyProps {
  accepted: boolean;
  onAcceptChange: (checked: boolean) => void;
}

export const TermsAndPrivacy = ({ accepted, onAcceptChange }: TermsAndPrivacyProps) => {
  return (
    <div className="flex items-start space-x-2 mt-6">
      <Checkbox
        id="terms"
        checked={accepted}
        onCheckedChange={onAcceptChange}
        className="mt-1"
      />
      <Label htmlFor="terms" className="text-sm text-white/90 md:text-gray-600 font-normal">
        I agree to the{" "}
        <a href="/terms" className="text-white hover:text-white/80 md:text-primary md:hover:underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="/privacy" className="text-white hover:text-white/80 md:text-primary md:hover:underline">
          Privacy Policy
        </a>
      </Label>
    </div>
  );
};