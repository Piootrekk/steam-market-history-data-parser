import {
  NavLink as NavRouterLink,
  type NavLinkProps as NavRouterLinkProps,
} from "react-router-dom";
import { baseStyles, sizes, variants } from "./base-styles";
import { cn } from "../../utils/merge-styles";

type NavLinkProps = NavRouterLinkProps & {
  className?: string;
};
const NavLink = ({ className, ...props }: NavLinkProps) => {
  return (
    <NavRouterLink
      {...props}
      className={({ isActive }) =>
        isActive
          ? cn(baseStyles, variants.default, sizes.default, className)
          : cn(baseStyles, variants.ghost, sizes.default, className)
      }
    />
  );
};

export default NavLink;
