import {
  NavLink as NavRouterLink,
  Link as RouterLink,
  type NavLinkProps as NavRouterLinkProps,
  type LinkProps as RouterLinkProps,
} from "react-router-dom";
import {
  baseStyles,
  sizes,
  variants,
  type BaseStylesProps,
} from "./base-styles";
import { cn } from "../../utils/merge-styles";

type NavLinkProps = NavRouterLinkProps & BaseStylesProps;
type LinkProps = RouterLinkProps & BaseStylesProps;

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

const Link = ({
  className,
  size = "default",
  variant = "default",
  ...props
}: LinkProps) => {
  return (
    <RouterLink
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    />
  );
};

export default NavLink;
export { Link };
