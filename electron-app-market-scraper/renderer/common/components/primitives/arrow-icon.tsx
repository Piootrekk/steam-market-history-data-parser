import { cn } from "@renderer/common/utils/merge-styles";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  type LucideProps,
} from "lucide-react";

type ArrowIconProp = {
  isTriggerRotate: boolean;
  direction: keyof typeof arrows;
} & LucideProps;

const arrows = {
  left: ChevronLeft,
  right: ChevronRight,
  up: ChevronUp,
  down: ChevronDown,
} as const satisfies Record<string, React.ElementType>;

const ArrowIcon = ({
  isTriggerRotate,
  direction,
  className,
  ...props
}: ArrowIconProp) => {
  const ChevronArrow = arrows[direction];
  return (
    <ChevronArrow
      className={cn(
        "h-3.5 w-3.5 transition-transform duration-100",
        isTriggerRotate && "rotate-180",
        className,
      )}
      strokeWidth={2}
      aria-hidden="true"
      {...props}
    />
  );
};

export default ArrowIcon;
