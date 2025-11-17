import { cn } from "../utils/merge-styles";

type CardProps = React.ComponentProps<"div">;

const Card = ({ children, className, ...rest }: CardProps) => {
  return (
    <div
      className={cn(
        "rounded-lg border bg-gradient-card shadow-card",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

const CardTitle = ({ className, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  );
};

Card.Title = CardTitle;

export default Card;
