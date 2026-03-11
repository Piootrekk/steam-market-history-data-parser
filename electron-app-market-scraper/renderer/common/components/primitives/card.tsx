import { cn } from "../../utils/merge-styles";

type CardProps = React.ComponentProps<"div">;

const Card = ({ children, className, ...rest }: CardProps) => {
  return (
    <div
      className={cn(
        "rounded-lg border bg-gradient-card text-card-foreground shadow-card shadow-sm transition-all duration-200 hover:shadow-elevated",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ className, ...rest }: CardProps) => {
  return (
    <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...rest} />
  );
};

const CardTitle = ({ className, ...rest }: CardProps) => {
  return (
    <div
      className={cn(
        "font-semibold text-2xl leading-none tracking-tight",
        className,
      )}
      {...rest}
    />
  );
};

const CardDescription = ({ className, ...rest }: CardProps) => {
  return (
    <div className={cn("text-muted-foreground text-sm", className)} {...rest} />
  );
};

const CardContent = ({ className, ...rest }: CardProps) => {
  return <div className={cn("p-6 pt-0", className)} {...rest} />;
};

export { Card, CardHeader, CardTitle, CardContent, CardDescription };
