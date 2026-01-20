import { ChevronLeft, ChevronRight } from "lucide-react";
import NavLink from "../../primitives/navlink";
import Button from "../../primitives/button";
import { cn } from "src/common/utils/merge-styles";

type PaginationProps = {
  currentPage: number;
  maxPage: number;
  to: string;
};

type PaginationWrapperProps = React.ComponentProps<"div">;

const Pagination = ({
  children,
  className,
  ...props
}: PaginationWrapperProps) => {
  return (
    <div className="px-4 pb-4">
      <div
        className={cn("flex items-center justify-center gap-1", className)}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};

const ChevronLeftPagination = ({ currentPage, to }: PaginationProps) => {
  const isDisabled = currentPage === 1;
  if (isDisabled)
    return (
      <Button disabled size="icon">
        <ChevronLeft className="h-4 w-4" />
      </Button>
    );
  return (
    <NavLink to={to} size="icon" className="h-8 w-8">
      <ChevronLeft className="h-4 w-4" />
    </NavLink>
  );
};

const CurrentPagePagination = ({ to, currentPage }: PaginationProps) => (
  <NavLink to={to}>{currentPage}</NavLink>
);

const ChevronRightPagination = ({
  to,
  currentPage,
  maxPage,
}: PaginationProps) => {
  const isDisabled = currentPage === maxPage;
  if (isDisabled)
    return (
      <Button disabled size="icon">
        <ChevronRight className="h-4 w-4" />
      </Button>
    );
  return (
    <NavLink to={to} size="icon" className="h-8 w-8">
      <ChevronRight className="h-4 w-4" />
    </NavLink>
  );
};

const Ellipsis = () => {
  return (
    <span className="flex h-8 w-8 items-center justify-center text-muted-foreground">
      ...
    </span>
  );
};

export {
  Ellipsis,
  CurrentPagePagination,
  ChevronLeftPagination,
  ChevronRightPagination,
  Pagination,
};
