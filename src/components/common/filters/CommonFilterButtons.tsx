import { FilterDropdown } from "./FilterDropdown";
import { ViewToggle } from "../views/ViewToggle";
import { ExportButton } from "../actions/ExportButton";

interface CommonFilterButtonsProps {
  filters: Array<{
    icon: React.ReactNode;
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: Array<{
      value: string;
      label: string;
    }>;
  }>;
  viewMode?: "grid" | "table";
  setViewMode?: (mode: "grid" | "table") => void;
  onExport?: () => void;
  showViewToggle?: boolean;
}

export const CommonFilterButtons = ({
  filters,
  viewMode,
  setViewMode,
  onExport,
  showViewToggle = true,
}: CommonFilterButtonsProps) => {
  return (
    <div className="flex items-center gap-2">
      {filters.map((filter, index) => (
        <FilterDropdown
          key={index}
          icon={filter.icon}
          label={filter.label}
          value={filter.value}
          onChange={filter.onChange}
          groups={[
            {
              label: filter.label,
              options: filter.options,
            },
          ]}
        />
      ))}

      {showViewToggle && viewMode && setViewMode && (
        <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
      )}

      {onExport && <ExportButton onExport={onExport} />}
    </div>
  );
};