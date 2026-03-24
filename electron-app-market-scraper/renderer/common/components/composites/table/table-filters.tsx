import { cn } from "@renderer/common/utils/merge-styles";
import { Search, SlidersHorizontal } from "lucide-react";
import { InputCheckbox } from "../../primitives/input-checkbox";
import { DropDown } from "../../primitives/tooltip-dropdown";

const activeFilterCount = 5;

const TableFiltersTab = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="mx-2 flex items-center gap-2">
        <DropDown.Layout align="left">
          <DropDown.Trigger>
            <SlidersHorizontal
              className="h-4 w-4"
              strokeWidth={2}
              aria-hidden="true"
            />
            Columns
          </DropDown.Trigger>

          <DropDown.OpenList>
            <fieldset>
              <div className="px-2 py-1.5 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                Toggle columns
              </div>
              <Xd />
            </fieldset>
          </DropDown.OpenList>
        </DropDown.Layout>
        <DropDown.Layout align="left">
          <DropDown.Trigger>
            <Search className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            Filters
            {activeFilterCount > 0 && (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 font-semibold text-[11px] text-primary-foreground">
                {activeFilterCount}
              </span>
            )}
          </DropDown.Trigger>

          <DropDown.OpenList>
            <div className="p-2 text-sm">Profile</div>
            <div className="p-2 text-sm">Settings</div>
            <div className="p-2 text-sm">Logout</div>
          </DropDown.OpenList>
        </DropDown.Layout>
      </div>
    </div>
  );
};

export { TableFiltersTab };

const searchableColumns = [
  {
    key: "1",
    label: "col1",
  },
  {
    key: "2",
    label: "col2",
  },
  {
    key: "3",
    label: "col14",
  },
  {
    key: "4",
    label: "col15",
  },
  {
    key: "5",
    label: "col16",
  },
  {
    key: "8",
    label: "col122",
  },
  {
    key: "6",
    label: "col1613",
  },
  {
    key: "7",
    label: "col16131",
  },
];

const Xd = () => (
  <>
    {searchableColumns.map((col) => (
      <div
        key={col.key}
        className={cn(
          "mx-2 rounded-md",
          "hover:bg-accent hover:text-accent-foreground",
        )}
      >
        <InputCheckbox
          checked={true}
          onChange={() => {}}
          label={col.label}
          aria-label={`Show ${col.label} column`}
          allSize="sm"
        />
      </div>
    ))}
  </>
);
