import { ChevronDown, ChevronUp } from "lucide-react";
import Button from "@renderer/common/components/primitives/button";
import { useLocalStoredValue } from "@renderer/common/hooks/local-storage.hook";

type SideBarSubCategoryExpendedProsp = {
  children: React.ReactNode;
  icon: React.ElementType;
  name: string;
};

const SideBarSubCategoryExpended = ({
  children,
  icon: Icon,
  name,
}: SideBarSubCategoryExpendedProsp) => {
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
        className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      >
        <div className="flex items-center gap-3 flex-1">
          <Icon className="h-5 w-5 shrink-0" />
          <span className="truncate">{name}</span>
        </div>
        {isOpen.isSubCollapsed ? (
          <ChevronUp className="h-4 w-4 hrink-0 ml-auto" />
        ) : (
          <ChevronDown className="h-4 w-4 hrink-0 ml-auto" />
        )}
      </Button>
      {isOpen.isSubCollapsed && (
        <div className="mt-1 space-y-0.5 ml-2 pl-4 border-l-2 border-sidebar-border">
          {children}
        </div>
      )}
    </div>
  );
};

export default SideBarSubCategoryExpended;
