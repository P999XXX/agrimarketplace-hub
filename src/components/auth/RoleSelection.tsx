import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { GoogleSignInButton } from "./GoogleSignInButton";
import { AuthDivider } from "./AuthDivider";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card } from "@/components/ui/card";

interface RoleSelectionProps {
  selectedRole: string;
  onRoleChange: (value: string) => void;
}

export const RoleSelection = ({ selectedRole, onRoleChange }: RoleSelectionProps) => {
  const isMobile = useIsMobile();
  
  const roleButtons = (
    <div className="grid grid-cols-1 gap-4">
      <Button
        type="button"
        variant="outline"
        className={`w-full p-3 h-auto flex flex-col items-center justify-center space-y-3 ${
          isMobile ? 'bg-white/5 hover:bg-white/10 text-white border-white/10 hover:text-white' : ''
        } ${
          selectedRole === "supplier" ? `${isMobile ? 'border-2 border-orange-500' : 'border-2 border-primary'}` : ""
        }`}
        onClick={() => onRoleChange("supplier")}
      >
        <img 
          src="/lovable-uploads/41cb0215-9cd9-4afa-82b8-64482d35a703.png" 
          alt="Supplier Icon" 
          className={`w-14 h-14 object-contain ${isMobile ? 'brightness-0 invert' : ''}`}
        />
        <div className="space-y-2">
          <div className="text-lg font-semibold">Supplier</div>
        </div>
      </Button>

      <Button
        type="button"
        variant="outline"
        className={`w-full p-3 h-auto flex flex-col items-center justify-center space-y-3 ${
          isMobile ? 'bg-white/5 hover:bg-white/10 text-white border-white/10 hover:text-white' : ''
        } ${
          selectedRole === "buyer" ? `${isMobile ? 'border-2 border-orange-500' : 'border-2 border-primary'}` : ""
        }`}
        onClick={() => onRoleChange("buyer")}
      >
        <img 
          src="/lovable-uploads/f45a7e35-0200-423a-a9d1-3342a197efe2.png" 
          alt="Buyer Icon" 
          className={`w-14 h-14 object-contain ${isMobile ? 'brightness-0 invert' : ''}`}
        />
        <div className="space-y-2">
          <div className="text-lg font-semibold">Buyer</div>
        </div>
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      {isMobile ? (
        <div className="space-y-4">
          {roleButtons}
        </div>
      ) : (
        <Card className="p-6 bg-white">
          {roleButtons}
        </Card>
      )}
    </div>
  );
};