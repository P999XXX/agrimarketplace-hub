import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NameFieldsProps {
  firstName: string;
  lastName: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const NameFields = ({ firstName, lastName, onChange }: NameFieldsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-1">
        <Label htmlFor="firstName">First Name</Label>
        <Input
          id="firstName"
          name="firstName"
          placeholder="First name"
          required
          value={firstName}
          onChange={onChange}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          id="lastName"
          name="lastName"
          placeholder="Last name"
          required
          value={lastName}
          onChange={onChange}
        />
      </div>
    </div>
  );
};