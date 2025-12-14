import { Info } from "lucide-react";
import Badge from "src/common/components/primitives/badge";
import { cn } from "src/common/utils/merge-styles";

type RecentActivitySectionProps = {
  activityStyle: keyof typeof activityStyles;
  Icon: React.ElementType;
  title: string;
  time: string;
  message: string;
};

const activityStyles = {
  success: "bg-success/10 text-success border-success/20 hover:bg-success/20",
  error:
    "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20",
  info: "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20",
} as const;

const RecentActivitySection = ({
  activityStyle = "info",
  Icon = Info,
  title,
  time,
  message,
}: RecentActivitySectionProps) => {
  return (
    <div className="flex gap-4 p-4 rounded-lg border border-border/50 bg-background/50 hover:bg-background/80 transition-colors">
      <div
        className={cn(
          "p-2.5 rounded-full shrink-0 h-fit",
          activityStyles[activityStyle]
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

          <p className="text-xs text-muted-foreground whitespace-nowrap">
            {time}
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
