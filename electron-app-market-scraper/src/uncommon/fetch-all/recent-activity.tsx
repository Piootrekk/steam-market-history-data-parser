import { CheckCircle2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "src/common/components/primitives/card";
import RecentActivitySection from "./recent-activity-section";

const activities = [
  {
    id: 1,
    title: "fetch",
    message: "Successfully fetched user data from API",
    time: "2 minutes ago",
    activityStyle: "success" as const,
    Icon: CheckCircle2,
  },
];

const RecentActivity = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Actions Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="pr-2">
          <div className="space-y-1">
            {activities.map((activity) => (
              <RecentActivitySection key={activity.id} {...activity} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
