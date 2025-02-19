import "./skeleton.css";

type SkeletonProps = {
  width?: string;
  height?: string;
  borderRadius?: string;
};

const Skeleton: React.FC<SkeletonProps> = ({
  height = "2rem",
  borderRadius = "4px",
}) => {
  return <div className="skeleton" style={{ height, borderRadius }}></div>;
};

export default Skeleton;
