import { cn } from "../../utils/merge-styles";

type ScrollContainerProps = React.ComponentProps<"div">;

const ScrollContainer = ({ className, children }: ScrollContainerProps) => {
  return (
    <div
      className={cn(
        "h-[calc(95vh-(var(--spacing)*12))]  w-full focus-visible:ring-2 ring-offset-background focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-1",
        className
      )}
    >
      {children}
    </div>
  );
};

type ScrollAreaProps = {
  direction: keyof typeof directionStyles;
} & React.ComponentProps<"div">;

const directionStyles = {
  horizontal: "scroll-area overflow-x-auto overflow-y-hidden whitespace-nowrap",
  vertical: "scroll-area overflow-y-auto overflow-x-hidden",
} as const;

const ScrollArea = ({
  className = "",
  children,
  direction,
  "aria-label": ariaLabel = "Scroll area",
  ...rest
}: ScrollAreaProps) => {
  return (
    <div
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
      className={cn(
        directionStyles[direction],
        "h-full w-full overscroll-contain focus:outline-none  disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

const ScrollAreaContainer = ({
  className,
  children,
  direction,
  "aria-label": ariaLabel = "Scroll area",
  ...rest
}: ScrollAreaProps) => {
  return (
    <ScrollContainer>
      <ScrollArea
        direction={direction}
        className={cn(directionStyles[direction], className)}
        {...rest}
      >
        {children}
      </ScrollArea>
    </ScrollContainer>
  );
};
export { ScrollAreaContainer, ScrollArea, ScrollContainer };
