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
} as const satisfies ClassValue;

const ToolTip = ({
  className,
  children,
  message,
  side = "right",
  show = true,
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
      </div>
    </div>
  );
};

export default ToolTip;
