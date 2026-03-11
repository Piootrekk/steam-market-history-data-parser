import { cn } from "../../utils/merge-styles";

type RootPageWrapperProps = React.ComponentProps<"div">;

const RootPageWrapper = ({
  children,
  className,
  ...rest
}: RootPageWrapperProps) => {
  return (
    <div
      className={cn(
        "mx-auto flex h-full max-w-7xl flex-col overflow-hidden",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default RootPageWrapper;
