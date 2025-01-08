import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";

export const UserAvatar = () => {
  const [initials, setInitials] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('first_name, last_name')
          .eq('id', session.user.id)
          .single();

        if (profile) {
          const firstInitial = profile.first_name?.[0] || '';
          const lastInitial = profile.last_name?.[0] || '';
          setInitials((firstInitial + lastInitial).toUpperCase());
        }
      }
    };

    getProfile();
  }, []);

  return (
    <Avatar className="h-8 w-8 bg-brand-600 hover:bg-brand-500 transition-colors cursor-pointer">
      <AvatarFallback className="bg-[rgb(0,128,96,0.9)] text-white text-sm hover:bg-[rgb(0,128,96,0.8)] transition-colors">
        {initials || '??'}
      </AvatarFallback>
    </Avatar>
  );
};