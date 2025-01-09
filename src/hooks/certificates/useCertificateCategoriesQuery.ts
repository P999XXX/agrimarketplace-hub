import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { CertificateCategory } from "@/components/certificates/types";

export const useCertificateCategoriesQuery = () => {
  return useQuery({
    queryKey: ["certificate-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("certificate_categories")
        .select("*")
        .is("deleted_at", null)
        .order("name");

      if (error) {
        throw error;
      }

      return data as CertificateCategory[];
    },
  });
};