import { cn } from "../../../utils/merge-styles";

type TableProps = React.ComponentProps<"table">;
type TableHeaderProps = React.ComponentProps<"thead">;
type TableBodyProps = React.ComponentProps<"tbody">;
type TableFooterProps = React.ComponentProps<"tfoot">;
type TableRowProps = React.ComponentProps<"tr">;
type TableHeaderRowProps = React.ComponentProps<"th">;
type TableCellProps = React.ComponentProps<"td">;

const Table = ({ className, ...others }: TableProps) => {
  return (
    <table
      className={cn("w-full caption-bottom text-sm", className)}
      {...others}
    />
  );
};

const TableHeader = ({ className, ...others }: TableHeaderProps) => {
  return <thead className={cn("[&_tr]:border-b", className)} {...others} />;
};

const TableBody = ({ className, ...others }: TableBodyProps) => {
  return (
    <tbody
      className={cn("[&_tr:last-child]:border-0", className)}
      {...others}
    />
  );
};

const TableFooter = ({ className, ...others }: TableFooterProps) => {
  return (
    <tfoot
      className={cn(
        "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...others}
    />
  );
};

const TableRow = ({ className, ...others }: TableRowProps) => (
  <tr className={cn("border-b  hover:bg-muted/50", className)} {...others} />
);

const TableHeaderRow = ({ className, ...others }: TableHeaderRowProps) => (
  <th
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...others}
  />
);

const TableCell = ({ className, ...others }: TableCellProps) => {
  return (
    <td
      className={cn(
        "p-4 align-middle [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...others}
    />
  );
};

export {
  Table,
  TableHeader,
  TableFooter,
  TableBody,
  TableRow,
  TableHeaderRow,
  TableCell,
};
