import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { GoogleSignInButton } from "./GoogleSignInButton";
import { AuthDivider } from "./AuthDivider";

interface RoleSelectionProps {
  selectedRole: string;
  onRoleChange: (value: string) => void;
}

export const RoleSelection = ({ selectedRole, onRoleChange }: RoleSelectionProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <RadioGroup value={selectedRole} onValueChange={onRoleChange}>
          <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
            <RadioGroupItem value="supplier" id="supplier" />
            <Label htmlFor="supplier" className="cursor-pointer">
              <div className="font-semibold">Supplier</div>
              <div className="text-sm text-gray-500">I want to sell agricultural products</div>
            </Label>
          </div>
          <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
            <RadioGroupItem value="buyer" id="buyer" />
            <Label htmlFor="buyer" className="cursor-pointer">
              <div className="font-semibold">Buyer</div>
              <div className="text-sm text-gray-500">I want to buy agricultural products</div>
            </Label>
          </div>
        </RadioGroup>
      </div>
      <GoogleSignInButton />
      <AuthDivider />
    </div>
  );
};