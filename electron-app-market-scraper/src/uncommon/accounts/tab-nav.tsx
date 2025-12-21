import NavLink from "src/common/components/primitives/navlink";
import type { NavRoutes } from "src/routes";

type TabNavProps = {
  subtabs: NavRoutes[];
};

const TabNav = ({ subtabs }: TabNavProps) => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-4">
        <div className="flex-1 flex bg-muted/50 rounded-md p-1">
          {subtabs.map((subtab, id) => (
            <NavLink
              key={`${subtab.path}-${id}`}
              to={subtab.path}
              end
              className={`
                px-1
                flex-1 flex items-center justify-center gap-1 sm:gap-2
              text-xs sm:text-md font-medium
                rounded-md transition-all
                min-w-0
              `}
            >
              <subtab.Icon className="h-4 w-4 shrink-0" />
              <span className="hidden sm:block truncate">{subtab.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabNav;
