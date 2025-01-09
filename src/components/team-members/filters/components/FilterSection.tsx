import { FilterGroup } from "../types/FilterTypes";

interface FilterSectionProps {
  label: string;
  value: string;
  groups: FilterGroup[];
  onChange: (value: string) => void;
}

export const FilterSection = ({ label, value, groups, onChange }: FilterSectionProps) => {
  return (
    <div className="space-y-3">
      <div className="font-medium text-sm">{label}</div>
      {groups.map((group, groupIndex) => (
        <div key={groupIndex} className="space-y-2">
          {group.label && (
            <div className="text-xs font-medium text-muted-foreground">
              {group.label}
            </div>
          )}
          <div className="space-y-1">
            {group.options.map((option) => (
              <button
                key={option.value}
                onClick={() => onChange(option.value)}
                className={`w-full text-left px-2 py-1.5 text-sm rounded-md ${
                  value === option.value
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-accent"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};