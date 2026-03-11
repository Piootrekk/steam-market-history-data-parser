import { cn } from "@renderer/common/utils/merge-styles";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LinkButton } from "../../../../common/components/primitives/navlink";

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

type SumaryProps = {
  start: number;
  limit: number;
  totalCount: number;
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
        className={cn(
          "flex flex-wrap items-center justify-center gap-1",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};

const ChevronLeftPagination = ({ page, to }: PaginationLeftProps) => {
  const isDisabled = page <= 0;

  return (
    <LinkButton disabled={isDisabled} variant="outline" to={to} size="icon">
      <ChevronLeft />
    </LinkButton>
  );
};

const PagePagination = ({ page, to, isCurrentPage }: CurrentPageProps) => (
  <LinkButton to={to} variant={isCurrentPage ? "default" : "outline"}>
    {page}
  </LinkButton>
);

const ChevronRightPagination = ({
  to,
  page,
  maxPage,
}: PaginationRightProps) => {
  const isDisabled = page > maxPage;

  return (
    <LinkButton disabled={isDisabled} to={to} size="icon" variant="outline">
      <ChevronRight />
    </LinkButton>
  );
};

const Ellipsis = () => {
  return (
    <span className="flex h-8 w-8 items-center justify-center text-muted-foreground">
      ...
    </span>
  );
};

const Summary = ({ start, totalCount, limit }: SumaryProps) => {
  const firstElement = start + 1;
  const lastElement = start + limit < totalCount ? start + limit : totalCount;
  return (
    <span className="px-4 text-muted-foreground text-sm">
      Showing {firstElement}-{lastElement} of {totalCount} listings.
    </span>
  );
};

export {
  Ellipsis,
  PagePagination,
  ChevronLeftPagination,
  ChevronRightPagination,
  Pagination,
  Summary,
};
