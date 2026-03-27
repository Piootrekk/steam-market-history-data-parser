import { cn } from "@renderer/common/utils/merge-styles";
import { ChevronDown } from "lucide-react";
import {
  createContext,
  type ReactNode,
  use,
  useEffect,
  useRef,
  useState,
} from "react";
import Button from "./button";

type Align = "left" | "right";

type DropDownContext = {
  open: boolean;
  toggle: () => void;
  close: () => void;
  align: Align;
};

const DropDownContext = createContext<DropDownContext | null>(null);

const useDropDown = () => {
  const ctx = use(DropDownContext);
  if (!ctx) {
    throw new Error("DropDown components must be used inside DropDown.Layout");
  }
  return ctx;
};

type LayoutProps = {
  children: ReactNode;
  align?: Align;
  className?: string;
};

const Layout = ({ children, align = "left", className }: LayoutProps) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggle = () => setOpen((prev) => !prev);
  const close = () => setOpen(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <DropDownContext.Provider value={{ open, toggle, close, align }}>
      <div ref={containerRef} className={cn("relative", className)}>
        {children}
      </div>
    </DropDownContext.Provider>
  );
};

type TriggerProps = {
  children: ReactNode;
  className?: string;
};

const Trigger = ({ children, className }: TriggerProps) => {
  const { open, toggle } = useDropDown();

  return (
    <Button
      type="button"
      variant="outline"
      onClick={toggle}
      aria-expanded={open}
      aria-haspopup="true"
      className={cn(
        "inline-flex items-center gap-2 rounded-md border px-3 py-2 font-medium",
        className,
      )}
    >
      {children}
      <ChevronDown
        className={cn(
          "h-3.5 w-3.5 transition-transform duration-100",
          open && "rotate-180",
        )}
        aria-hidden="true"
      />
    </Button>
  );
};

type OpenListProps = {
  children: ReactNode;
  className?: string;
};

const OpenList = ({ children, className }: OpenListProps) => {
  const { open, align } = useDropDown();

  if (!open) return null;

  return (
    <fieldset>
      <div
        className={cn(
          "scroll-area absolute z-50 mt-2 max-h-80 overflow-y-auto rounded-lg border border-border bg-popover py-2 shadow-elevated",
          align === "right" ? "right-0" : "left-0",
          "min-w-50",
          className,
        )}
      >
        {children}
      </div>
    </fieldset>
  );
};

export const DropDown = {
  Layout,
  Trigger,
  OpenList,
};
