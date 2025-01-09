import { useState, useRef } from "react";
import { SheetClose } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { InviteFormFields } from "./InviteFormFields";
import { InviteFormFooter } from "./InviteFormFooter";
import { InviteSheetHeader } from "./InviteSheetHeader";
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
    <form onSubmit={handleSubmit} className="flex flex-col h-full max-h-[calc(100vh-4.5rem)]">
      <div className="border-b">
        <InviteSheetHeader />
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
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

      <div className="border-t mt-auto">
        <div className="p-4">
          <InviteFormFooter isLoading={isLoading} />
        </div>
      </div>
      
      <SheetClose ref={closeButtonRef} className="hidden" />
    </form>
  );
};