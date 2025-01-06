import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { GoogleSignInButton } from "./GoogleSignInButton";
import { AuthDivider } from "./AuthDivider";
import { Users } from "lucide-react";

interface RoleSelectionProps {
  selectedRole: string;
  onRoleChange: (value: string) => void;
}

export const RoleSelection = ({ selectedRole, onRoleChange }: RoleSelectionProps) => {
  return (
    <div className="space-y-6">
      {/* Icon centered above buttons */}
      <div className="flex justify-center mb-8">
        <Users className="w-16 h-16 text-primary" />
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <Button
            type="button"
            variant={selectedRole === "supplier" ? "default" : "outline"}
            className={`w-full p-6 h-auto flex flex-col items-start space-y-1 ${
              selectedRole === "supplier" ? "border-primary" : ""
            }`}
            onClick={() => onRoleChange("supplier")}
          >
            <div className="font-semibold">Supplier</div>
            <div className="text-sm text-left text-gray-500">
              I want to sell agricultural products
            </div>
          </Button>

          <Button
            type="button"
            variant={selectedRole === "buyer" ? "default" : "outline"}
            className={`w-full p-6 h-auto flex flex-col items-start space-y-1 ${
              selectedRole === "buyer" ? "border-primary" : ""
            }`}
            onClick={() => onRoleChange("buyer")}
          >
            <div className="font-semibold">Buyer</div>
            <div className="text-sm text-left text-gray-500">
              I want to buy agricultural products
            </div>
          </Button>
        </div>
      </div>

      <GoogleSignInButton />
      <AuthDivider />
    </div>
  );
};