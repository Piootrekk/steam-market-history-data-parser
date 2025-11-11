import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "src/common/components/button";
import { cn } from "src/common/utils/merge-styles";

type SidebarHeaderProps = {
  title: string;
  isCollabsed: boolean;
  setIsCollabsed: (isCollabsed: boolean) => void;
};

const SidebarHeader = ({
  title,
  isCollabsed,
  setIsCollabsed,
}: SidebarHeaderProps) => {
  return (
    <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
      {!isCollabsed && (
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "font-semibold text-sidebar-foreground whitespace-nowrap transition-opacity",
              isCollabsed ? "opacity-0" : "opacity-100"
            )}
          >
            {title}
          </span>
        </div>
      )}
      <Button
        onClick={() => setIsCollabsed(!isCollabsed)}
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 text-sidebar-foreground hover:bg-sidebar-accent"
      >
        {isCollabsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};

export default SidebarHeader;
