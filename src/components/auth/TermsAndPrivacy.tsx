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
      <Label htmlFor="terms" className="text-sm text-gray-600 font-normal">
        I agree to the{" "}
        <a href="/terms" className="text-primary hover:underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="/privacy" className="text-primary hover:underline">
          Privacy Policy
        </a>
      </Label>
    </div>
  );
};