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
            className={`w-full p-3 h-auto flex flex-col items-center justify-center space-y-3 
              md:bg-white md:hover:bg-gray-50/80
              bg-white/10 backdrop-blur-sm border-white/20 max-md:hover:bg-white/[0.15] max-md:hover:border-white/40 transition-colors
              ${selectedRole === "supplier" ? "md:border-2 md:border-primary border-2 border-white/40" : ""}`}
            onClick={() => onRoleChange("supplier")}
          >
            <img 
              src="/lovable-uploads/41cb0215-9cd9-4afa-82b8-64482d35a703.png" 
              alt="Supplier Icon" 
              className="w-14 h-14 object-contain md:filter-none brightness-0 invert"
            />
            <div className="space-y-2">
              <div className="text-lg font-semibold md:text-gray-900 text-white">Supplier</div>
            </div>
          </Button>

          <Button
            type="button"
            variant="outline"
            className={`w-full p-3 h-auto flex flex-col items-center justify-center space-y-3 
              md:bg-white md:hover:bg-gray-50/80
              bg-white/10 backdrop-blur-sm border-white/20 max-md:hover:bg-white/[0.15] max-md:hover:border-white/40 transition-colors
              ${selectedRole === "buyer" ? "md:border-2 md:border-primary border-2 border-white/40" : ""}`}
            onClick={() => onRoleChange("buyer")}
          >
            <img 
              src="/lovable-uploads/f45a7e35-0200-423a-a9d1-3342a197efe2.png" 
              alt="Buyer Icon" 
              className="w-14 h-14 object-contain md:filter-none brightness-0 invert"
            />
            <div className="space-y-2">
              <div className="text-lg font-semibold md:text-gray-900 text-white">Buyer</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};