import type { ClassValue } from "clsx";
import { cn } from "src/common/utils/merge-styles";

type ToolTipProps = {
  side?: "left" | "right" | "top" | "bottom";
  show?: boolean;
  message: string;
} & React.ComponentProps<"div">;

const positionClasses = {
  right: "left-full ml-2 top-1/2 -translate-y-1/2",
  left: "right-full mr-2 top-1/2 -translate-y-1/2",
  top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
  bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
} as const satisfies Record<string, ClassValue>;

const caretWrapperClasses = {
  right: "absolute left-0 top-1/2 -translate-x-full -translate-y-1/2",
  left: "absolute right-0 top-1/2 translate-x-full -translate-y-1/2",
  top: "absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full",
  bottom: "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full",
} as const satisfies Record<string, ClassValue>;

const caretBorderClasses = {
  right: "border-y-8 border-y-transparent border-r-8 border-r-border",
  left: "border-y-8 border-y-transparent border-l-8 border-l-border",
  top: "border-x-8 border-x-transparent border-t-8 border-t-border",
  bottom: "border-x-8 border-x-transparent border-b-8 border-b-border",
} as const satisfies Record<string, ClassValue>;

const caretInnerClasses = {
  right:
    "absolute top-1/2 left-[1px] -translate-y-1/2 border-y-7 border-y-transparent border-r-7 border-r-popover",
  left: "absolute top-1/2 right-[1px] -translate-y-1/2 border-y-7 border-y-transparent border-l-7 border-l-popover",
  top: "absolute left-1/2 bottom-[1px] -translate-x-1/2 border-x-7 border-x-transparent border-t-7 border-t-popover",
  bottom:
    "absolute left-1/2 top-[1px] -translate-x-1/2 border-x-7 border-x-transparent border-b-7 border-b-popover",
} as const satisfies Record<string, ClassValue>;

const ToolTip = ({
  className,
  children,
  message,
  side = "right",
  ...props
}: ToolTipProps) => {
  return (
    <div className="relative group">
      {children}
      <div
        {...props}
        className={cn(
          "absolute z-50 px-3 py-1.5 text-sm rounded-md whitespace-nowrap",
          "bg-popover text-popover-foreground border border-border shadow-md",
          "opacity-0 invisible group-hover:opacity-100 group-hover:visible",
          "transition-opacity duration-150",
          positionClasses[side],
          className
        )}
      >
        {message}

        <span className={caretWrapperClasses[side]}>
          <span
            className={cn("relative block w-0 h-0", caretBorderClasses[side])}
          >
            <span className={cn("block w-0 h-0", caretInnerClasses[side])} />
          </span>
        </span>
      </div>
    </div>
  );
};

export default ToolTip;
