import { useQuery } from "@tanstack/react-query";
import type { Certificate } from "@/components/certificates/types";

const mockCertificates: Certificate[] = [
  {
    id: '1',
    company_id: '1',
    name: 'Sample Certificate',
    category: 'organic',
    status: 'valid',
    created_at: new Date().toISOString(),
    expiry_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    file_path: '/sample.pdf',
    file_type: 'pdf',
    file_size: 1024,
    description: 'Sample certificate description',
    issuer: 'Sample Issuer',
    certificate_number: 'CERT-001'
  }
];

export const useCertificatesQuery = () => {
  return useQuery({
    queryKey: ["certificates"],
    queryFn: async () => {
      return Promise.resolve(mockCertificates);
    },
  });
};