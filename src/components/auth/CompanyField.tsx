import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CompanyFieldProps {
  companyName: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CompanyField = ({ companyName, onChange }: CompanyFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="companyName">Company Name</Label>
      <Input
        id="companyName"
        name="companyName"
        placeholder="Your company name"
        required
        value={companyName}
        onChange={onChange}
      />
    </div>
  );
};