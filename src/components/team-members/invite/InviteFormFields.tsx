import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface InviteFormFieldsProps {
  name: string;
  setName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  role: string;
  setRole: (value: string) => void;
  message: string;
  setMessage: (value: string) => void;
}

export const InviteFormFields = ({
  name,
  setName,
  email,
  setEmail,
  role,
  setRole,
  message,
  setMessage,
}: InviteFormFieldsProps) => {
  return (
    <>
      <div className="space-y-1">
        <Label htmlFor="name" className="text-foreground">Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="John Doe"
          required
          className="h-12"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="email" className="text-foreground">Email address</Label>
        <Input
          id="email"
          type="email"
          placeholder="colleague@company.com"
          required
          className="h-12"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="role" className="text-foreground">Role</Label>
        <Select required value={role} onValueChange={setRole}>
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="member">Member</SelectItem>
            <SelectItem value="viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <Label htmlFor="message" className="text-foreground">Personal message (optional)</Label>
        <Textarea
          id="message"
          placeholder="Write a personal message..."
          className="min-h-[120px] resize-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
    </>
  );
};