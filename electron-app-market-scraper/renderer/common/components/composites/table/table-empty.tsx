import { CardContent } from "@renderer/common/components/primitives/card";

const TableEmpty = () => {
  return (
    <CardContent>
      <p className="mt-2 text-muted-foreground">
        There are no listings to display for your current query.
      </p>
    </CardContent>
  );
};

export default TableEmpty;
