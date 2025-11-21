import { cn } from "../utils/merge-styles";

type CardProps = React.ComponentProps<"div">;

const Card = ({ children, className, ...rest }: CardProps) => {
  return (
    <div
      className={cn(
        "rounded-lg border text-card-foreground shadow-sm bg-gradient-card shadow-card hover:shadow-elevated transition-all duration-200",
        className
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
        "text-2xl font-semibold leading-none tracking-tight",
        className
      )}
      {...rest}
    />
  );
};

const CardDescription = ({ className, ...rest }: CardProps) => {
  return (
    <div className={cn("text-sm text-muted-foreground", className)} {...rest} />
  );
};

const CardContent = ({ className, ...rest }: CardProps) => {
  return <div className={cn("p-6 pt-0", className)} {...rest} />;
};

export { Card, CardHeader, CardTitle, CardContent, CardDescription };
