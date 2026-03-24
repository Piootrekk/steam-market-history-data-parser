import { Check } from "lucide-react";
import { cn } from "../../utils/merge-styles";

type InputCheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: React.ReactNode;
  disabled?: boolean;
  allSize?: "sm" | "md";
  className?: string;
} & React.ComponentProps<"input">;

const InputCheckbox = ({
  checked,
  onChange,
  label,
  disabled,
  className,
  allSize,
  ...rest
}: InputCheckboxProps) => {
  const boxSize = allSize === "sm" ? "h-4 w-4" : "h-5 w-5";
  const iconSize = allSize === "sm" ? "h-3 w-3" : "h-3.5 w-3.5";

  return (
    <label
      className={cn(
        "flex w-full select-none items-center gap-2.5 px-2 py-1.5",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        className,
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
        {...rest}
      />

      <span
        aria-hidden="true"
        className={cn(
          "flex shrink-0 items-center justify-center rounded border",
          boxSize,
          checked
            ? "border-primary bg-primary text-primary-foreground"
            : "border-input bg-transparent",
          !disabled && !checked && "group-hover:border-muted-foreground/50",
          "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-card",
          checked
            ? "peer-focus-visible:ring-offset-1"
            : "peer-focus-visible:ring-offset-0",
        )}
      >
        {checked && <Check className={iconSize} strokeWidth={3} />}
      </span>

      {label != null && (
        <span className="text-popover-foreground text-sm">{label}</span>
      )}
    </label>
  );
};

export { InputCheckbox };
