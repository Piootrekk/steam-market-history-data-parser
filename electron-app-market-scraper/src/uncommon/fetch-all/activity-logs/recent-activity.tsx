import { CheckCircle2, Info, TriangleAlert } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "src/common/components/primitives/card";
import RecentActivitySection from "./recent-activity-section";
import type { FetchProgress } from "../progress.types";

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
              activitiesLogs.map((activity, index) => (
                <RecentActivitySection
                  key={`${activity.timestamp}-${index}`}
                  {...activity}
                />
              ))}
            {activities.length === 0 && (
              <p className="text-sm text-muted-foreground">
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
