import { CardContent } from "@renderer/common/components/primitives/card";

const QueryListingsEmpty = () => {
  return (
    <CardContent>
      <p className="text-muted-foreground">
        There are no offers to display for your current query.
      </p>
    </CardContent>
  );
};

export default QueryListingsEmpty;
