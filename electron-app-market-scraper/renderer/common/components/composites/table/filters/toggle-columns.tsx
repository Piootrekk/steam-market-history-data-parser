import { InputCheckbox } from "@renderer/common/components/primitives/input-checkbox";
import { DropDown } from "@renderer/common/components/primitives/tooltip-dropdown";
import { SlidersHorizontal } from "lucide-react";
import type { Column } from "../table";

type ToggleColumnsProps<T> = {
  columns: Column<T>[];
  visibleColumns: Set<string>;
  onToggle: (key: string) => void;
};

const ToggleColumns = <T extends Record<string, unknown>>({
  columns,
  visibleColumns,
  onToggle,
}: ToggleColumnsProps<T>) => {
  return (
    <DropDown.Layout align="right">
      <DropDown.Trigger>
        <SlidersHorizontal
          className="h-4 w-4"
          strokeWidth={2}
          aria-hidden="true"
        />
        Columns
      </DropDown.Trigger>

      <DropDown.OpenList>
        <div className="px-2 py-1.5 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
          Toggle columns
        </div>
        {columns.map((col) => (
          <div
            key={col.key.toString()}
            className="mx-2 rounded-md hover:bg-accent hover:text-accent-foreground"
          >
            <InputCheckbox
              checked={visibleColumns.has(col.key.toString())}
              onChange={() => onToggle(col.key.toString())}
              label={col.header}
              aria-label={`Show ${col.header} column`}
              allSize="sm"
            />
          </div>
        ))}
      </DropDown.OpenList>
    </DropDown.Layout>
  );
};

export default ToggleColumns;
