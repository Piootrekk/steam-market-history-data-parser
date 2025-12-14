import { cn } from "../../utils/merge-styles";

type BasePageWrapperProps = React.ComponentProps<"div">;

const BasicPageWrapper = ({
  children,
  className,
  ...rest
}: BasePageWrapperProps) => {
  return (
    <div
      className={cn(
        "max-w-7xl mx-auto h-full overflow-hidden flex flex-col",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default BasicPageWrapper;
