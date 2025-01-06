import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { GoogleSignInButton } from "./GoogleSignInButton";
import { AuthDivider } from "./AuthDivider";
import { User, Users } from "lucide-react";

interface RoleSelectionProps {
  selectedRole: string;
  onRoleChange: (value: string) => void;
}

export const RoleSelection = ({ selectedRole, onRoleChange }: RoleSelectionProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <Button
            type="button"
            variant="outline"
            className={`w-full p-8 h-auto flex flex-col items-center justify-center space-y-4 ${
              selectedRole === "supplier" ? "border-2 border-primary" : ""
            }`}
            onClick={() => onRoleChange("supplier")}
          >
            <Users className="w-16 h-16" />
            <div className="space-y-2">
              <div className="text-xl font-semibold">Supplier</div>
              <div className="text-base text-center text-gray-500">
                I want to sell agricultural products
              </div>
            </div>
          </Button>

          <Button
            type="button"
            variant="outline"
            className={`w-full p-8 h-auto flex flex-col items-center justify-center space-y-4 ${
              selectedRole === "buyer" ? "border-2 border-primary" : ""
            }`}
            onClick={() => onRoleChange("buyer")}
          >
            <User className="w-16 h-16" />
            <div className="space-y-2">
              <div className="text-xl font-semibold">Buyer</div>
              <div className="text-base text-center text-gray-500">
                I want to buy agricultural products
              </div>
            </div>
          </Button>
        </div>
      </div>

      <GoogleSignInButton />
      <AuthDivider />
    </div>
  );
};