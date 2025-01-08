import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const UserAvatar = () => {
  const [initials, setInitials] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('first_name, last_name, avatar_url')
          .eq('id', session.user.id)
          .single();

        if (profile) {
          const firstInitial = profile.first_name?.[0] || '';
          const lastInitial = profile.last_name?.[0] || '';
          setInitials((firstInitial + lastInitial).toUpperCase());
          
          if (profile.avatar_url) {
            setAvatarUrl(profile.avatar_url);
          } else {
            // Generate and save new avatar if none exists
            try {
              const { data, error } = await supabase.functions.invoke('generate-avatar');
              if (error) throw error;
              
              if (data.image) {
                await supabase
                  .from('profiles')
                  .update({ avatar_url: data.image })
                  .eq('id', session.user.id);
                
                setAvatarUrl(data.image);
              }
            } catch (error) {
              console.error('Error generating avatar:', error);
              toast({
                title: "Avatar Generation Failed",
                description: "Using initials as fallback",
                variant: "destructive",
              });
            }
          }
        }
      }
    };

    getProfile();
  }, [toast]);

  return (
    <Avatar className="h-8 w-8 bg-brand-600 hover:bg-brand-500 transition-colors cursor-pointer">
      <AvatarImage src={avatarUrl || ''} alt="Profile" />
      <AvatarFallback className="bg-[rgb(0,128,96,0.9)] text-white text-sm hover:bg-[rgb(0,128,96,0.8)] transition-colors">
        {initials || '??'}
      </AvatarFallback>
    </Avatar>
  );
};