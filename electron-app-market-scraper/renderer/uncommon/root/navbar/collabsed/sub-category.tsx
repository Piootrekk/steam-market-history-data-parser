import { ChevronDown, ChevronUp } from "lucide-react";
import Button from "@renderer/common/components/primitives/button";
import { useLocalStoredValue } from "@renderer/common/hooks/local-storage.hook";

type SideBarSubCategoryCollabsedProsp = {
  children: React.ReactNode;
  icon: React.ElementType;
};

const SideBarSubCategoryCollabsed = ({
  children,
  icon: Icon,
}: SideBarSubCategoryCollabsedProsp) => {
  const [isOpen, setIsOpen] = useLocalStoredValue("ui-config");
  return (
    <div>
      <Button
        variant="ghost"
        onClick={() =>
          setIsOpen((prev) => ({
            ...prev,
            isSubCollapsed: !prev.isSubCollapsed,
          }))
        }
        className="w-full justify-center px-0 flex-col gap-1.5 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      >
        <div className="flex items-center flex-col">
          <Icon className="h-5 w-5 shrink-0" />
        </div>
        {isOpen.isSubCollapsed ? (
          <ChevronUp className="h-3 w-3 shrink-0" />
        ) : (
          <ChevronDown className="h-3 w-3 shrink-0" />
        )}
      </Button>
      {isOpen.isSubCollapsed && (
        <div className="mt-1 space-y-0.5 w-full px-1">{children}</div>
      )}
    </div>
  );
};

export default SideBarSubCategoryCollabsed;
