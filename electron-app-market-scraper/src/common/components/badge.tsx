import { cn } from "../utils/merge-styles";

const baseStyles =
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

const variants = {
  outline: "text-foreground",
} as const;

type BadgeProps = {
  variant: keyof typeof variants;
} & React.ComponentProps<"div">;

const Badge = ({ className, variant = "outline", ...rest }: BadgeProps) => {
  return (
    <div className={cn(baseStyles, variants[variant], className)} {...rest} />
  );
};

export default Badge;
