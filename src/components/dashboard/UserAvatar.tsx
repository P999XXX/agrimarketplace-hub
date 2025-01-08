import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const UserAvatar = () => {
  const [initials, setInitials] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
          console.log("No active session found");
          return;
        }

        const { data: profile, error } = await supabase
          .from('profiles')
          .select('first_name, last_name')
          .eq('id', session.user.id)
          .maybeSingle();

        if (error) {
          console.error("Error fetching profile:", error);
          toast({
            title: "Error loading profile",
            description: "Please try refreshing the page",
            variant: "destructive",
          });
          return;
        }

        if (profile) {
          const firstInitial = profile.first_name?.[0] || '';
          const lastInitial = profile.last_name?.[0] || '';
          const userInitials = (firstInitial + lastInitial).toUpperCase();
          setInitials(userInitials);
        } else {
          console.log("No profile found for user");
          const emailInitial = session.user.email?.[0].toUpperCase() || '?';
          setInitials(emailInitial);
        }
      } catch (error) {
        console.error("Error in getProfile:", error);
        toast({
          title: "Error",
          description: "Could not load user profile",
          variant: "destructive",
        });
      }
    };

    getProfile();
  }, []);

  return (
    <Avatar className="h-8 w-8 cursor-pointer">
      <AvatarFallback className="bg-primary text-primary-foreground text-sm">
        {initials || '??'}
      </AvatarFallback>
    </Avatar>
  );
};