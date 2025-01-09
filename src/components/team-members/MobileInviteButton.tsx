import { CommonMobileActionButton } from "../common/mobile/CommonMobileActionButton";
import { InviteMemberForm } from "./InviteMemberForm";

export const MobileInviteButton = () => {
  return (
    <CommonMobileActionButton
      title="Invite Team Member"
      buttonText="Invite Member"
    >
      <InviteMemberForm />
    </CommonMobileActionButton>
  );
};