import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { SheetClose } from "@/components/ui/sheet";

export const InviteMemberForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // TODO: Implement invitation logic
      toast({
        title: "Invitation sent",
        description: "Team member has been invited successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send invitation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <div className="space-y-1">
        <Label htmlFor="email" className="text-foreground">Email address</Label>
        <Input
          id="email"
          type="email"
          placeholder="colleague@company.com"
          required
          className="h-12"
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="role" className="text-foreground">Role</Label>
        <Select required>
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
        />
      </div>

      <div className="space-y-2 pt-2">
        <Button type="submit" className="w-full py-6" disabled={isLoading}>
          {isLoading ? "Sending invitation..." : "Send invitation"}
        </Button>
        <SheetClose asChild>
          <Button type="button" variant="outline" className="w-full py-6">
            Cancel
          </Button>
        </SheetClose>
      </div>
    </form>
  );
};