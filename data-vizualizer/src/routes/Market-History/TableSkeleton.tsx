import Skeleton from "@/common/components/Skeleton/Skeleton";

type TableSkeletonProps = {
  amount: number;
};

const TableSkeleton: React.FC<TableSkeletonProps> = ({ amount }) => {
  return (
    <>
      {Array.from({ length: amount }).map((_, index) => (
        <Skeleton key={index} />
      ))}
    </>
  );
};

export default TableSkeleton;
