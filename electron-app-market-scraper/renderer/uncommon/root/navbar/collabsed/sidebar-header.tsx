import { ChevronRight } from "lucide-react";
import Button from "@renderer/common/components/primitives/button";

type SidebarHeaderCollapsedProps = {
  onToggle: () => void;
};

const SidebarHeaderCollapsed = ({ onToggle }: SidebarHeaderCollapsedProps) => {
  return (
    <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
      <Button
        onClick={onToggle}
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 text-sidebar-foreground hover:bg-sidebar-accent"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default SidebarHeaderCollapsed;
