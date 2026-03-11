import Button from "@renderer/common/components/primitives/button";
import { useLocalStoredValue } from "@renderer/common/hooks/local-storage.hook";
import { ChevronDown, ChevronUp } from "lucide-react";

type SideBarSubCategoryExpendedProps = {
  children: React.ReactNode;
  icon: React.ElementType;
  name: string;
};

const SideBarSubCategoryExpended = ({
  children,
  icon: Icon,
  name,
}: SideBarSubCategoryExpendedProps) => {
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
        <div className="flex flex-1 items-center gap-3">
          <Icon className="h-5 w-5 shrink-0" />
          <span className="truncate">{name}</span>
        </div>
        {isOpen.isSubCollapsed ? (
          <ChevronUp className="hrink-0 ml-auto h-4 w-4" />
        ) : (
          <ChevronDown className="hrink-0 ml-auto h-4 w-4" />
        )}
      </Button>
      {isOpen.isSubCollapsed && (
        <div className="mt-1 ml-2 space-y-0.5 border-sidebar-border border-l-2 pl-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default SideBarSubCategoryExpended;
