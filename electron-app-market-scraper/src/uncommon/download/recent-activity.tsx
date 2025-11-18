import Card from "src/common/components/card";

const RecentActivity = () => {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Actions Activity</Card.Title>
      </Card.Header>
      <Card.Content>
        <p className="text-muted-foreground text-sm">
          No recent activity to display.
        </p>
      </Card.Content>
    </Card>
  );
};

export default RecentActivity;
