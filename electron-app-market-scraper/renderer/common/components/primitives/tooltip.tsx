import type { ClassValue } from "clsx";
import { cn } from "@renderer/common/utils/merge-styles";
import { Card } from "./card";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";

type ToolTipProps = {
  side?: "left" | "right" | "top" | "bottom";
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
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible || !triggerRef.current) return;

    const updatePosition = () => {
      const rect = triggerRef.current!.getBoundingClientRect();
      const spacing = 1;

      let top = 0;
      let left = 0;

      switch (side) {
        case "top":
          top = rect.top - spacing;
          left = rect.left + rect.width / 2;
          break;
        case "bottom":
          top = rect.bottom + spacing;
          left = rect.left + rect.width / 2;
          break;
        case "left":
          top = rect.top + rect.height / 2;
          left = rect.left - spacing;
          break;
        case "right":
          top = rect.top + rect.height / 2;
          left = rect.right + spacing;
          break;
      }

      setPosition({ top, left });
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isVisible, side]);

  const tooltipContent = isVisible && (
    <Card
      {...props}
      style={{
        position: "absolute",
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex: 9999,
      }}
      className={cn(
        "px-3 py-1.5 text-sm rounded-md whitespace-nowrap",
        "transition-opacity duration-150",
        positionClasses[side],
        className,
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
    </Card>
  );

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {createPortal(tooltipContent, document.body)}
    </>
  );
};

export default ToolTip;
