import { CheckCircle2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "src/common/components/primitives/card";
import RecentActivitySection from "./recent-activity-section";
import type { FetchProgress } from "../progress.types";

const activitiesDefault = {
  title: "Fetch",
  activityStyle: "success" as const,
  Icon: CheckCircle2,
};

type RecentActivityProps = {
  activities: FetchProgress[];
};

const RecentActivity = ({ activities }: RecentActivityProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Actions Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="pr-2">
          <div className="space-y-4">
            {activities.length > 0 &&
              activities.map((activity) => (
                <RecentActivitySection
                  key={activity.timestamp}
                  {...activitiesDefault}
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
