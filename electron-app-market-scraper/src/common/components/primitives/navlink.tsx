import {
  NavLink as NavRouterLink,
  type NavLinkProps as NavRouterLinkProps,
} from "react-router-dom";
import {
  baseStyles,
  sizes,
  variants,
  type BaseStylesProps,
} from "./base-styles";
import { cn } from "../../utils/merge-styles";

type NavLinkProps = NavRouterLinkProps & BaseStylesProps;

const NavLink = ({ className, size = "default", ...props }: NavLinkProps) => {
  return (
    <NavRouterLink
      {...props}
      className={({ isActive }) =>
        isActive
          ? cn(baseStyles, variants.default, sizes[size], className)
          : cn(baseStyles, variants.ghost, sizes[size], className)
      }
    />
  );
};

export default NavLink;
