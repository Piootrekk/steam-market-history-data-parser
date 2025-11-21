import { cn } from "../utils/merge-styles";

type ScrollAreaProps = {
  direction: keyof typeof directionStyles;
  ariaLabel?: string;
} & React.ComponentProps<"div">;

const directionStyles = {
  vertical: "scroll-area overflow-x-auto overflow-y-hidden whitespace-nowrap",
  horizontal: "scroll-area overflow-y-auto overflow-x-hidden",
} as const;

const ScrollArea = ({
  className = "",
  children,
  direction = "horizontal",
  ariaLabel = "Scroll area",
  ...rest
}: ScrollAreaProps) => {
  return (
    <div
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
      className={cn(
        directionStyles[direction],
        "focus:outline-none focus-visible:ring-2 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};
export { ScrollArea };
