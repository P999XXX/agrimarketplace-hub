import { Button } from "@/components/ui/button";
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
        <div className="grid grid-cols-1 gap-4">
          <Button
            type="button"
            variant="outline"
            className={`w-full p-4 h-auto flex flex-col items-center justify-center space-y-4 ${
              selectedRole === "supplier" ? "border-2 border-primary" : ""
            }`}
            onClick={() => onRoleChange("supplier")}
          >
            <img 
              src="/lovable-uploads/41cb0215-9cd9-4afa-82b8-64482d35a703.png" 
              alt="Supplier Icon" 
              className="w-16 h-16 object-contain"
            />
            <div className="space-y-2">
              <div className="text-xl font-semibold">Supplier</div>
            </div>
          </Button>

          <Button
            type="button"
            variant="outline"
            className={`w-full p-4 h-auto flex flex-col items-center justify-center space-y-4 ${
              selectedRole === "buyer" ? "border-2 border-primary" : ""
            }`}
            onClick={() => onRoleChange("buyer")}
          >
            <img 
              src="/lovable-uploads/f45a7e35-0200-423a-a9d1-3342a197efe2.png" 
              alt="Buyer Icon" 
              className="w-16 h-16 object-contain"
            />
            <div className="space-y-2">
              <div className="text-xl font-semibold">Buyer</div>
            </div>
          </Button>
        </div>
      </div>

      <GoogleSignInButton />
      <AuthDivider />
    </div>
  );
};