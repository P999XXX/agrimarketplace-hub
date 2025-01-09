import { useState, useRef } from "react";
import { SheetClose } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { InviteFormFields } from "./InviteFormFields";
import { InviteFormFooter } from "./InviteFormFooter";
import { useInviteMember } from "../hooks/useInviteMember";

export const InviteMemberForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const { isLoading, inviteMember } = useInviteMember();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    inviteMember(name, email, role, message, () => {
      closeButtonRef.current?.click();
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-[calc(100vh-8rem)] pt-6">
      <ScrollArea className="flex-1 px-2">
        <div className="space-y-4">
          <InviteFormFields
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            role={role}
            setRole={setRole}
            message={message}
            setMessage={setMessage}
          />
        </div>
      </ScrollArea>
      <div className="mt-auto border-t bg-background pt-4">
        <InviteFormFooter isLoading={isLoading} />
      </div>
      <SheetClose ref={closeButtonRef} className="hidden" />
    </form>
  );
};