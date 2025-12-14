import { cn } from "../../utils/merge-styles";

type InputProps = React.ComponentProps<"input"> & {
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  onRightIconClick?: () => void;
  onLeftIconClick?: () => void;
};

const InputContainer = ({
  className,
  ...rest
}: React.ComponentProps<"input">) => {
  return <div className={cn("space-y-2 flex flex-col", className)} {...rest} />;
};

const InputLabel = ({ className, ...rest }: React.ComponentProps<"label">) => {
  return (
    <label
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...rest}
    />
  );
};

const IconLabel = ({
  onClick,
  children,
  className,
  ariaLabel,
}: {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}) => (
  <InputLabel
    onClick={onClick}
    aria-label={ariaLabel}
    className={cn("focus:outline-none rounded-full p-1", className)}
  >
    {children}
  </InputLabel>
);

const Input = ({
  rightIcon,
  leftIcon,
  onRightIconClick,
  onLeftIconClick,
  className,
  id,
  ...rest
}: InputProps) => {
  return (
    <div className="relative">
      <input
        id={id}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2  ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          leftIcon ? "pl-12" : "pl-4",
          rightIcon ? "pr-12" : "pr-4",
          className
        )}
        {...rest}
      />
      {leftIcon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          {onLeftIconClick ? (
            <IconLabel onClick={onLeftIconClick} ariaLabel="left icon">
              {leftIcon}
            </IconLabel>
          ) : (
            <span aria-hidden>{leftIcon}</span>
          )}
        </div>
      )}

      {rightIcon && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {onRightIconClick ? (
            <IconLabel onClick={onRightIconClick} ariaLabel="right icon">
              {rightIcon}
            </IconLabel>
          ) : (
            <span aria-hidden>{rightIcon}</span>
          )}
        </div>
      )}
    </div>
  );
};

export { Input, InputContainer, InputLabel };
