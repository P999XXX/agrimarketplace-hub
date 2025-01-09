import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

export const UserAvatar = ({ size = "default" }: { size?: "default" | "large" }) => {
  const [initials, setInitials] = useState("NN");
  const { toast } = useToast();

  const avatarSize = size === "large" ? "h-10 w-10" : "h-8 w-8";
  const textSize = size === "large" ? "text-sm" : "text-sm";

  return (
    <Avatar className={`cursor-pointer ${avatarSize}`}>
      <AvatarFallback className={`bg-primary text-primary-foreground ${textSize}`}>
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};