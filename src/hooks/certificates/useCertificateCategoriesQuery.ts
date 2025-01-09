import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useCertificateCategoriesQuery = () => {
  return useQuery({
    queryKey: ["certificate-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("certificate_categories")
        .select("*")
        .is("deleted_at", null)
        .order("name", { ascending: true });

      if (error) {
        throw error;
      }

      return data;
    },
  });
};