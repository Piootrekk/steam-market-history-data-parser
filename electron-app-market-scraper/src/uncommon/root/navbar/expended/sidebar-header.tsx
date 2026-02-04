import { ChevronLeft } from "lucide-react";
import Button from "src/common/components/primitives/button";
import { cn } from "src/common/utils/merge-styles";

type SidebarHeaderExtendedProps = {
  title: string;
  onToggle: () => void;
};

const SidebarHeaderExtended = ({
  title,
  onToggle,
}: SidebarHeaderExtendedProps) => {
  return (
    <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "font-semibold text-sidebar-foreground whitespace-nowrap"
          )}
        >
          {title}
        </span>
      </div>
      <Button
        onClick={onToggle}
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 text-sidebar-foreground hover:bg-sidebar-accent"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default SidebarHeaderExtended;
