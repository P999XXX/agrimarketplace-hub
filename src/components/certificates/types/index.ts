export type ViewMode = "grid" | "table";

export interface CertificateCategory {
  id: string;
  name: string;
  icon_path: string;
  category_type: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface Certificate {
  id: string;
  company_id: string;
  name: string;
  category: string;
  description?: string;
  file_path: string;
  file_type: string;
  file_size: number;
  uploaded_by: string;
  created_at: string;
  updated_at: string;
  expiry_date: string;
  status: string;
  version: number;
  deleted_at?: string;
  category_id: string;
}

export interface CertificateFormData {
  category_id: string;
  issue_date: Date;
  expiry_date: Date;
  file: File;
}