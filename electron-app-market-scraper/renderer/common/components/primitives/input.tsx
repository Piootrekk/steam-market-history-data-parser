import { cn } from "../../utils/merge-styles";

type InputProps = React.ComponentProps<"input"> & {
  id: string;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  isLabel?: boolean;
  onRightIconClick?: () => void;
  onLeftIconClick?: () => void;
};

const InputContainer = ({
  className,
  ...rest
}: React.ComponentProps<"input">) => {
  return <div className={cn("flex flex-col space-y-2", className)} {...rest} />;
};

const SpanLabel = ({ className, ...rest }: React.ComponentProps<"span">) => {
  return (
    <span
      className={cn(
        "font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
      )}
      {...rest}
    />
  );
};

const IconSpan = ({
  onClick,
  children,
  className,
  ariaLabel,
}: {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}) => (
  <SpanLabel
    onClick={onClick}
    aria-label={ariaLabel}
    className={cn("rounded-full p-1 focus:outline-none", className)}
  >
    {children}
  </SpanLabel>
);

type InputLabelProps = React.ComponentProps<"label"> & {
  htmlFor: string;
};

const InputLabel = ({
  className,
  htmlFor,
  children,
  ...rest
}: InputLabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
      )}
      {...rest}
    >
      {children}
    </label>
  );
};

const Input = ({
  rightIcon,
  leftIcon,
  isLabel,
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
          "peer flex w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
          leftIcon ? "pl-12" : "pl-4",
          rightIcon ? "pr-12" : "pr-4",
          className,
        )}
        {...rest}
      />
      {leftIcon && (
        <div className="absolute top-1/2 left-3 -translate-y-1/2 transform text-muted-foreground peer-focus:text-ring">
          {onLeftIconClick ? (
            <IconSpan onClick={onLeftIconClick} ariaLabel="left icon">
              {leftIcon}
            </IconSpan>
          ) : (
            <label htmlFor={id} aria-hidden>
              {leftIcon}
            </label>
          )}
        </div>
      )}

      {rightIcon && (
        <div className="absolute top-1/2 right-3 -translate-y-1/2 transform text-muted-foreground peer-focus:text-ring">
          {onRightIconClick ? (
            <IconSpan onClick={onRightIconClick} ariaLabel="right icon">
              {rightIcon}
            </IconSpan>
          ) : (
            <label htmlFor={id} aria-hidden>
              {leftIcon}
            </label>
          )}
        </div>
      )}
    </div>
  );
};

export { Input, InputContainer, SpanLabel, InputLabel };
