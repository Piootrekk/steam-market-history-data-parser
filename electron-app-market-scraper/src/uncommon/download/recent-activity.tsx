import { CheckCircle2, Info, AlertCircle } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "src/common/components/card";
import { ScrollArea } from "src/common/components/scroll-area";
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
  {
    id: 2,
    title: "update",
    message: "User profile settings have been updated",
    time: "5 minutes ago",
    activityStyle: "info" as const,
    Icon: Info,
  },
  {
    id: 3,
    title: "delete",
    message: "Dashboard configuration was removed",
    time: "10 minutes ago",
    activityStyle: "error" as const,
    Icon: AlertCircle,
  },
  {
    id: 4,
    title: "fetch",
    message: "Retrieved latest analytics data",
    time: "15 minutes ago",
    activityStyle: "info" as const,
    Icon: Info,
  },
  {
    id: 5,
    title: "sync",
    message: "Data migration completed successfully",
    time: "20 minutes ago",
    activityStyle: "success" as const,
    Icon: CheckCircle2,
  },
  {
    id: 11,
    title: "fetch",
    message: "Successfully fetched user data from API",
    time: "2 minutes ago",
    activityStyle: "success" as const,
    Icon: CheckCircle2,
  },
  {
    id: 21,
    title: "update",
    message: "User profile settings have been updated",
    time: "5 minutes ago",
    activityStyle: "info" as const,
    Icon: Info,
  },
  {
    id: 31,
    title: "delete",
    message: "Dashboard configuration was removed",
    time: "10 minutes ago",
    activityStyle: "error" as const,
    Icon: AlertCircle,
  },
  {
    id: 41,
    title: "fetch",
    message: "Retrieved latest analytics data",
    time: "15 minutes ago",
    activityStyle: "info" as const,
    Icon: Info,
  },
  {
    id: 51,
    title: "sync",
    message: "Data migration completed successfully",
    time: "20 minutes ago",
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
      <CardContent className="flex flex-col ">
        <ScrollArea className=" h-80" direction="horizontal">
          <div className="px-2">
            <div className="space-y-4">
              {activities.map((activity) => (
                <RecentActivitySection key={activity.id} {...activity} />
              ))}
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
