import { cn } from "../utils/merge-styles";

type ScrollContainerProps = React.ComponentProps<"div">;

const ScrollContainer = ({ className, children }: ScrollContainerProps) => {
  return (
    <div className={cn("h-[calc(95vh-(var(--spacing)*12))] w-full", className)}>
      {children}
    </div>
  );
};

type ScrollAreaProps = {
  direction?: keyof typeof directionStyles;
} & React.ComponentProps<"div">;

const directionStyles = {
  vertical: "scroll-area overflow-x-auto overflow-y-hidden whitespace-nowrap",
  horizontal: "scroll-area overflow-y-auto overflow-x-hidden",
} as const;

const ScrollArea = ({
  className = "",
  children,
  direction = "horizontal",
  "aria-label": ariaLabel = "Scroll area",
  ...rest
}: ScrollAreaProps) => {
  return (
    <ScrollContainer>
      <div
        role="region"
        aria-label={ariaLabel}
        tabIndex={0}
        className={cn(
          directionStyles[direction],

          "h-full overscroll-contain focus:outline-none focus-visible:ring-2 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...rest}
      >
        {children}
      </div>
    </ScrollContainer>
  );
};
export { ScrollArea };
