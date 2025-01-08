import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export const UserAvatar = () => {
  const [initials, setInitials] = useState("");
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

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
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="mr-2"
      >
        {theme === "dark" ? (
          <Sun className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
        ) : (
          <Moon className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>
      
      <Avatar className="h-8 w-8">
        <AvatarFallback className="bg-primary text-primary-foreground text-sm">
          {initials || '??'}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};