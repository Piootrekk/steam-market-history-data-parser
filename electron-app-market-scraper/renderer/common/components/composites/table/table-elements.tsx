import { cn } from "../../../utils/merge-styles";

type TableProps = React.ComponentProps<"table">;
type TableHeaderProps = React.ComponentProps<"thead">;
type TableBodyProps = React.ComponentProps<"tbody">;
type TableFooterProps = React.ComponentProps<"tfoot">;
type TableRowProps = React.ComponentProps<"tr">;
type TableHeaderRowProps = React.ComponentProps<"th">;
type TableCellProps = React.ComponentProps<"td">;

const Table = ({ className, ...others }: TableProps) => (
  <div className="w-full overflow-x-auto scroll-area">
    <table
      className={cn("w-full caption-bottom text-sm", className)}
      {...others}
    />
  </div>
);

const TableHeader = ({ className, ...others }: TableHeaderProps) => (
  <thead className={cn("[&_tr]:border-b", className)} {...others} />
);

const TableBody = ({ className, ...others }: TableBodyProps) => (
  <tbody className={cn("[&_tr:last-child]:border-0", className)} {...others} />
);

const TableFooter = ({ className, ...others }: TableFooterProps) => (
  <tfoot
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className,
    )}
    {...others}
  />
);

const TableRow = ({ className, ...others }: TableRowProps) => (
  <tr className={cn("border-b transition-colors", className)} {...others} />
);

const TableHeaderRow = ({ className, ...others }: TableHeaderRowProps) => (
  <th
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground whitespace-nowrap [&:has([role=checkbox])]:pr-0",
      className,
    )}
    {...others}
  />
);

const TableCell = ({ className, ...others }: TableCellProps) => (
  <td
    className={cn(
      "p-4 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0",
      className,
    )}
    {...others}
  />
);

export {
  Table,
  TableHeader,
  TableFooter,
  TableBody,
  TableRow,
  TableHeaderRow,
  TableCell,
};
