import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NameFieldsProps {
  firstName: string;
  lastName: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const NameFields = ({ firstName, lastName, onChange }: NameFieldsProps) => {
  return (
    <div className="space-y-4 w-full">
      <div className="space-y-1 w-full">
        <Label htmlFor="firstName" className="text-white md:text-foreground">First Name</Label>
        <Input
          id="firstName"
          name="firstName"
          placeholder="First name"
          required
          value={firstName}
          onChange={onChange}
        />
      </div>

      <div className="space-y-1 w-full">
        <Label htmlFor="lastName" className="text-white md:text-foreground">Last Name</Label>
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