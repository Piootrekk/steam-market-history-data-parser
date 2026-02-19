import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@renderer/common/components/primitives/card";

const AllListingsEmpty = () => {
  return (
    <Card>
      <CardHeader className="space-y-6">
        <CardTitle>
          <p>Listings</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">
          No listings to display, please make sure to fetch them first.
        </p>
      </CardContent>
    </Card>
  );
};

export default AllListingsEmpty;
