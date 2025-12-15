import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "src/common/components/primitives/button";
import NavLink from "src/common/components/primitives/navlink";

type TabNavLinks = {
  icon: React.ElementType;
  path: string;
  label: string;
};

type TabNavProps = {
  subtabs: TabNavLinks[];
};

const TabNav = ({ subtabs }: TabNavProps) => {
  return (
    <>
      <div className="w-full">
        <div className="flex items-center gap-4">
          <Button
            size="icon"
            variant="ghost"
            className="p-2 rounded-md hover:bg-accent transition-colors"
            aria-label="Previous tab"
          >
            <ChevronLeft className="h-5 w-5 text-muted-foreground shrink" />
          </Button>

          <div className="flex-1 flex h-10 sm:h-12 bg-muted/50 rounded-md p-1">
            {subtabs.map((subtab, id) => (
              <NavLink
                key={`${subtab.path}-${id}`}
                to={subtab.path}
                className={`
                          flex-1 flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4
                          text-xs sm:text-sm font-medium rounded-sm transition-all
                        `}
              >
                <subtab.icon className="h-4 w-4 shrink" />
                <span className="hidden sm:inline">{subtab.label}</span>
              </NavLink>
            ))}
          </div>

          <Button
            size="icon"
            variant="ghost"
            className="p-2 rounded-md"
            aria-label="Next tab"
          >
            <ChevronRight className="h-5 w-5 text-muted-foreground shrink" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default TabNav;
export type { TabNavLinks };
