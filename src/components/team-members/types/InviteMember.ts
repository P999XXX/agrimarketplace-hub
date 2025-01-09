export interface InviteMemberForm {
  name: string;
  email: string;
  role: string;
  message: string;
}

export interface InviteFormProps {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  role: string;
  setRole: (role: string) => void;
  message: string;
  setMessage: (message: string) => void;
}