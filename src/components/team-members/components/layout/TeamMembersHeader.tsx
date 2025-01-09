import { TeamMembersHeader as BaseTeamMembersHeader } from "../../TeamMembersHeader";

interface TeamMembersHeaderProps {
  view: "grid" | "table";
  setView: (view: "grid" | "table") => void;
}

export const TeamMembersHeader = ({ view, setView }: TeamMembersHeaderProps) => {
  return (
    <div className="sticky top-16 flex-none space-y-4 px-4 pt-4 pb-3.6 dark:bg-black/10 bg-white/70 backdrop-blur-md z-[5] transition-shadow duration-200">
      <BaseTeamMembersHeader 
        view={view} 
        onViewChange={setView}
      />
    </div>
  );
};