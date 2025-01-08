import { utils, writeFile } from 'xlsx';
import { TeamMember } from '@/hooks/useTeamMembers';
import { useToast } from "@/hooks/use-toast";

export const useExportTeamMembers = () => {
  const { toast } = useToast();

  const exportToExcel = async (teamMembers: TeamMember[], isLoading: boolean) => {
    try {
      if (isLoading) {
        toast({
          title: "Please wait",
          description: "The data is still loading...",
          variant: "default",
        });
        return;
      }

      if (teamMembers.length === 0) {
        toast({
          title: "No data to export",
          description: "There are no team members matching your current filters.",
          variant: "default",
        });
        return;
      }

      const exportData = teamMembers.map(member => ({
        Name: member.name || member.email,
        Email: member.email,
        Role: member.role,
        Status: member.status,
        'Invited By': member.inviter ? `${member.inviter.first_name || ''} ${member.inviter.last_name || ''}`.trim() : '',
        'Invited On': new Date(member.created_at).toLocaleDateString(),
        'Last Login': member.last_login ? new Date(member.last_login).toLocaleDateString() : 'Never'
      }));

      const wb = utils.book_new();
      const ws = utils.json_to_sheet(exportData);
      utils.book_append_sheet(wb, ws, "Team Members");

      const date = new Date().toISOString().split('T')[0];
      const fileName = `team-members-${date}.xlsx`;

      writeFile(wb, fileName);

      toast({
        title: "Export successful",
        description: "Your team members list has been downloaded.",
        variant: "default",
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Export failed",
        description: "There was an error exporting your data. Please try again.",
        variant: "destructive",
      });
    }
  };

  return { exportToExcel };
};