import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "src/common/components/card";
import { ScrollArea } from "src/common/components/scroll-area";

const RecentActivity = () => {
  return (
    <Card className="h-max-full">
      <CardHeader>
        <CardTitle>Actions Activity</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col ">
        <ScrollArea className="h-44 max-h-255" direction="horizontal">
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm">
              No recent activity to display.
            </p>
            <p className="text-muted-foreground text-sm">
              No recent activity to display.
            </p>
            <p className="text-muted-foreground text-sm">
              No recent activity to display.
            </p>

            <p className="text-muted-foreground text-sm">
              No recent activity to display.
            </p>
            <p className="text-muted-foreground text-sm">
              No recent activity to display.
            </p>
            <p className="text-muted-foreground text-sm">
              No recent activity to display.
            </p>
            <p className="text-muted-foreground text-sm">
              No recent activity to display.
            </p>
            <p className="text-muted-foreground text-sm">
              No recent activity to display.
            </p>
            <p className="text-muted-foreground text-sm">
              No recent activity to display.
            </p>
            <p className="text-muted-foreground text-sm">
              No recent activity to display.
            </p>
            <p className="text-muted-foreground text-sm">
              No recent activity to display.
            </p>
            <p className="text-muted-foreground text-sm">
              No recent activity to display.
            </p>
            <p className="text-muted-foreground text-sm">
              No recent activity to display.
            </p>
            <p className="text-muted-foreground text-sm">
              No recent activity to display.
            </p>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
