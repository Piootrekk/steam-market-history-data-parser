import { Pagination } from "src/common/components/composites/table/table-pagination";

type AccountPaginationProps = {
  currentPage: number;
  maxPage: number;
  to: string;
};

const AccountTablePagination = ({
  currentPage,
  maxPage,
  to,
}: AccountPaginationProps) => {
  return <Pagination></Pagination>;
};

export default AccountTablePagination;
