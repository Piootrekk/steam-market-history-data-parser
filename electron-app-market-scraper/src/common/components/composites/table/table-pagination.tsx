import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "../../primitives/navlink";
import Button from "../../primitives/button";
import { cn } from "src/common/utils/merge-styles";

type PaginationRightProps = {
  page: number;
  maxPage: number;
  to: string;
};

type PaginationLeftProps = {
  page: number;
  to: string;
};

type CurrentPageProps = {
  page: number;
  to: string;
  isCurrentPage?: boolean;
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

const ChevronLeftPagination = ({ page, to }: PaginationLeftProps) => {
  const isDisabled = page === 1;
  if (isDisabled)
    return (
      <Button disabled size="icon" variant="outline">
        <ChevronLeft />
      </Button>
    );
  return (
    <Link variant="outline" to={to} size="icon">
      <ChevronLeft />
    </Link>
  );
};

const PagePagination = ({ page, to, isCurrentPage }: CurrentPageProps) => (
  <Link to={to} variant={isCurrentPage ? "default" : "outline"}>
    {page}
  </Link>
);

const ChevronRightPagination = ({
  to,
  page,
  maxPage,
}: PaginationRightProps) => {
  const isDisabled = page === maxPage;
  if (isDisabled)
    return (
      <Button disabled size="icon" variant="outline">
        <ChevronRight />
      </Button>
    );
  return (
    <Link to={to} size="icon" variant="outline">
      <ChevronRight />
    </Link>
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
  PagePagination,
  ChevronLeftPagination,
  ChevronRightPagination,
  Pagination,
};
