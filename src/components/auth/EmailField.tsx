import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EmailFieldProps {
  email: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const EmailField = ({ email, onChange }: EmailFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        name="email"
        type="email"
        placeholder="your@email.com"
        required
        value={email}
        onChange={onChange}
      />
    </div>
  );
};