import Button from "@renderer/common/components/primitives/button";
import { cn } from "@renderer/common/utils/merge-styles";
import { ChevronLeft } from "lucide-react";

type SidebarHeaderExtendedProps = {
  title: string;
  onToggle: () => void;
};

const SidebarHeaderExtended = ({
  title,
  onToggle,
}: SidebarHeaderExtendedProps) => {
  return (
    <div className="flex h-16 items-center justify-between border-sidebar-border border-b px-4">
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "whitespace-nowrap font-semibold text-sidebar-foreground",
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
