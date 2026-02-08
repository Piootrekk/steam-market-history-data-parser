import {
  NavLink as NavRouterLink,
  Link as RouterLink,
  useMatch,
  useNavigate,
  useResolvedPath,
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
type NavButtonProps = React.ComponentProps<"button"> &
  BaseStylesProps & {
    to: string;
    end?: boolean;
  };
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

const NavButton = ({
  className,
  size = "default",
  to,
  end,
  ...props
}: NavButtonProps) => {
  const navigate = useNavigate();
  const resolved = useResolvedPath(to);

  const match = useMatch({
    path: resolved.pathname,
    end,
  });

  const isActive = match !== null;

  return (
    <button
      {...props}
      className={
        isActive
          ? cn(baseStyles, variants.default, sizes[size], className)
          : cn(baseStyles, variants.ghost, sizes[size], className)
      }
      onClick={() => navigate(to)}
    />
  );
};

export default NavLink;
export { Link, NavButton };
