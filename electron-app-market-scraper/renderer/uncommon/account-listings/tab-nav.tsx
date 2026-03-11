import { NavButton } from "@renderer/common/components/primitives/navlink";
import type { NavRoutes } from "@renderer/routes";

type TabNavProps = {
  subtabs: NavRoutes[];
};

const TabNav = ({ subtabs }: TabNavProps) => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-4">
        <div className="flex flex-1 rounded-md bg-muted/50 p-1">
          {subtabs.map((subtab) => (
            <NavButton
              key={`${subtab.path}`}
              to={subtab.path}
              className={`flex min-w-0 flex-1 items-center justify-center gap-1 rounded-md px-1 font-medium text-xs transition-all sm:gap-2 sm:text-md`}
            >
              <subtab.Icon className="h-4 w-4 shrink-0" />
              <span className="hidden truncate sm:block">{subtab.label}</span>
            </NavButton>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabNav;
