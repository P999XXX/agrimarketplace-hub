import { useQuery } from "@tanstack/react-query";
import type { Certificate } from "@/components/certificates/types";

// Mock data für Entwicklung
const mockCertificates: Certificate[] = [
  {
    id: '1',
    name: 'Sample Certificate',
    category: 'Test',
    status: 'active',
    created_at: new Date().toISOString(),
  }
];

export const useCertificatesQuery = () => {
  return useQuery({
    queryKey: ["certificates"],
    queryFn: async () => {
      // Simuliere API-Aufruf
      return new Promise<Certificate[]>((resolve) => {
        setTimeout(() => {
          resolve(mockCertificates);
        }, 1000);
      });
    },
  });
};