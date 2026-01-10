import { Info } from "lucide-react";
import Badge from "src/common/components/primitives/badge";
import { cn } from "src/common/utils/merge-styles";

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
  start: "bg-primary/10 text-primary border-primary/20",
  finish: "bg-primary/10 text-primary border-primary/20",
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
    <div className="flex gap-4  p-4 rounded-lg border border-border/50 bg-background/50  transition-colors">
      <div
        className={cn(
          "p-2.5 rounded-full shrink-0 h-fit",
          activityStyles[activityStyle] ?? activityStyles.info
        )}
      >
        <Icon className="h-5 w-5" />
      </div>

      <div className="flex-1 min-w-0 space-y-1.5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0 flex-wrap">
            <span className="text-sm font-semibold text-foreground uppercase truncate">
              {title}
            </span>

            <Badge
              variant="outline"
              className={cn(
                "text-xs px-2.5 py-0.5",
                activityStyles[activityStyle]
              )}
            >
              {activityStyle}
            </Badge>
          </div>
          <p
            className="text-xs text-muted-foreground whitespace-nowrap"
            title={getconvertedDate(timestamp)}
          >
            {getTimeAgo(timestamp)}
          </p>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {message}
        </p>
      </div>
    </div>
  );
};

export default RecentActivitySection;
export type { RecentActivitySectionProps };
