import { type CSSProperties, useEffect, useRef, useState } from "react";
import { cn } from "../../utils/merge-styles";

type ScrollAreaProps = {
  direction: keyof typeof directionStyles;
} & React.ComponentProps<"div">;

const directionStyles = {
  vertical: " overflow-y-auto overflow-x-hidden scrollbar-stable",
  horizontal: " overflow-x-auto overflow-y-hidden scrollbar-auto",
} as const satisfies Record<string, string>;

const ScrollArea = ({
  direction,
  className,
  children,
  ...rest
}: ScrollAreaProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(0);
  useEffect(() => {
    const updateSize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(containerRef.current);
      if (direction === "vertical") {
        const marginBottom = parseFloat(computedStyle.marginBottom) || 0;
        const availableHeight = window.innerHeight - rect.top - marginBottom;
        setSize(Math.max(0, availableHeight));
      } else {
        const marginRight = parseFloat(computedStyle.marginRight) || 0;
        const availableWidth = window.innerWidth - rect.left - marginRight;
        setSize(Math.max(0, availableWidth));
      }
    };

    window.addEventListener("resize", updateSize);
    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    updateSize();
    return () => {
      window.removeEventListener("resize", updateSize);
      resizeObserver.disconnect();
    };
  }, [direction]);

  const sizeStyles = {
    vertical: { height: size > 0 ? `${size}px` : "auto" },
    horizontal: { width: size > 0 ? `${size}px` : "auto" },
  } satisfies Record<string, CSSProperties>;

  return (
    <section
      ref={containerRef}
      tabIndex={direction === "vertical" ? 0 : undefined}
      className={cn(
        directionStyles[direction],
        "scroll-area focus-visible:outline-2 focus-visible:outline-ring focus-visible:-outline-offset-2",
        className,
      )}
      style={sizeStyles[direction]}
      {...rest}
    >
      {children}
    </section>
  );
};

export { ScrollArea };
