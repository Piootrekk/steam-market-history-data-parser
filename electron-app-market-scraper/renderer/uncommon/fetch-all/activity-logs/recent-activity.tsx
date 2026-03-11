import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@renderer/common/components/primitives/card";
import type { FetchProgress } from "@renderer/common/hooks/progress.hook";
import { CheckCircle2, Info, TriangleAlert } from "lucide-react";
import RecentActivitySection from "./recent-activity-section";

const defaultIcons: Record<string, React.ElementType> = {
  success: CheckCircle2,
  error: TriangleAlert,
  warning: TriangleAlert,
  info: Info,
} as const;

type RecentActivityProps = {
  activities: FetchProgress[];
};

const RecentActivity = ({ activities }: RecentActivityProps) => {
  const activitiesLogs = activities.map(({ message, status, timestamp }) => {
    return {
      title: "Fetch",
      Icon: defaultIcons[status],
      message,
      activityStyle: status,
      timestamp,
    };
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Actions Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="pr-2">
          <div className="space-y-4">
            {activities.length > 0 &&
              activitiesLogs.map((activity, index) => {
                const key = `${activity.timestamp}-${index}`;
                return <RecentActivitySection key={key} {...activity} />;
              })}
            {activities.length === 0 && (
              <p className="text-muted-foreground text-sm">
                There's no recent activities.
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
