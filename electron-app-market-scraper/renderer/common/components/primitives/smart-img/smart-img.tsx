import { cn } from "@renderer/common/utils/merge-styles";
import questionPng from "./question.png";

type SmartImgProps = {
  protocol?: string;
  fallbackPath?: string;
} & React.ComponentProps<"img">;

const SmartImg = ({
  protocol = "app-images",
  src,
  className,
  fallbackPath = questionPng,
  ...props
}: SmartImgProps) => {
  const url = new URL(`${protocol}://${src}`);
  return (
    <img
      src={url.href}
      className={cn("w-9 h-9 object-contain app-image", className)}
      {...props}
      onError={(e) => {
        e.currentTarget.src = fallbackPath;
      }}
    />
  );
};

export default SmartImg;
