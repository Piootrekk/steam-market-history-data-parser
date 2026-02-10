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
        "max-w-7xl mx-auto h-full overflow-hidden flex flex-col ",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default RootPageWrapper;
