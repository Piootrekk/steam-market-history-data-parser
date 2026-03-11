import Badge from "@renderer/common/components/primitives/badge";
import { cn } from "@renderer/common/utils/merge-styles";
import { Info } from "lucide-react";

type RecentActivitySectionProps = {
  activityStyle: string;
  Icon: React.ElementType;
  title: string;
  message?: string;
  timestamp: number;
};

const activityStyles: Record<string, string> = {
  success: "bg-success/10 text-success border-success/20",
  warning: "bg-warning/10 text-warning border-warning/20",
  error: "bg-destructive/10 text-destructive border-destructive/20",
  info: "bg-primary/10 text-primary border-primary/20",
} as const;

const getconvertedDate = (timestamp: number) => {
  const localStringDate = new Date(timestamp).toLocaleString("en-GB");
  return localStringDate;
};

const getTimeAgo = (timestamp: number) => {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const diff = Date.now() - timestamp;

  const seconds = Math.round(diff / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);

  if (Math.abs(seconds) < 60) return rtf.format(-seconds, "second");
  if (Math.abs(minutes) < 60) return rtf.format(-minutes, "minute");
  if (Math.abs(hours) < 24) return rtf.format(-hours, "hour");
  return rtf.format(-days, "day");
};

const RecentActivitySection = ({
  activityStyle = "info",
  Icon = Info,
  title,
  timestamp,
  message,
}: RecentActivitySectionProps) => {
  return (
    <div className="flex gap-4 rounded-lg border border-border/50 bg-background/50 p-4">
      <div
        className={cn(
          "h-fit shrink-0 rounded-full p-2.5",
          activityStyles[activityStyle] ?? activityStyles.info,
        )}
      >
        <Icon className="h-5 w-5" />
      </div>

      <div className="min-w-0 flex-1 space-y-1.5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <span className="truncate font-semibold text-foreground text-sm uppercase">
              {title}
            </span>

            <Badge
              variant="outline"
              className={cn(
                "px-2.5 py-0.5 text-xs",
                activityStyles[activityStyle],
              )}
            >
              {activityStyle}
            </Badge>
          </div>
          <p
            className="whitespace-nowrap text-muted-foreground text-xs"
            title={getconvertedDate(timestamp)}
          >
            {getTimeAgo(timestamp)}
          </p>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {message}
        </p>
      </div>
    </div>
  );
};

export default RecentActivitySection;
export type { RecentActivitySectionProps };
