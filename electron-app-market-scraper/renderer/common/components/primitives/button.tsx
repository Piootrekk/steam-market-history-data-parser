import { cn } from "../../utils/merge-styles";
import {
  type BaseStylesProps,
  baseStyles,
  sizes,
  variants,
} from "./base-styles";

type ButtonProps = React.ComponentProps<"button"> & BaseStylesProps;

const Button = ({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
    />
  );
};

export default Button;
