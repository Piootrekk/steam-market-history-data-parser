import {
  ChevronLeftPagination,
  ChevronRightPagination,
  PagePagination,
  Ellipsis,
  Pagination,
} from "src/common/components/composites/table/table-pagination";

type AccountPaginationProps = {
  startParam: number;
  limit: number;
  totalCount: number;
};

const getPageCount = (totalCount: number, limit: number) => {
  return Math.ceil(totalCount / limit);
};

const getCurrentPage = (startParam: number, limit: number) => {
  return Math.ceil(startParam / limit + 1);
};

const AccountTablePagination = ({
  startParam,
  limit,
  totalCount,
}: AccountPaginationProps) => {
  const totalPages = getPageCount(totalCount, limit);
  const currentPage = getCurrentPage(startParam, limit);
  const showLeftEllipsis = currentPage > 3;
  const showRightEllipsis = currentPage < totalPages - 2;
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  return (
    <Pagination>
      <ChevronLeftPagination to="" page={currentPage} />
      <PagePagination to="" page={1} isCurrentPage={currentPage === 1} />
      {showLeftEllipsis && <Ellipsis />}
      {prevPage > 1 && <PagePagination page={prevPage} to={"#"} />}
      {currentPage !== 1 && currentPage < totalPages && (
        <PagePagination
          page={currentPage}
          to={"#"}
          isCurrentPage={currentPage !== 1 && currentPage !== totalPages}
        />
      )}
      {nextPage < totalPages && <PagePagination page={nextPage} to={"#"} />}
      {showRightEllipsis && <Ellipsis />}
      <PagePagination
        to=""
        page={totalPages}
        isCurrentPage={currentPage === totalPages}
      />
      <ChevronRightPagination to="" page={currentPage} maxPage={totalPages} />
    </Pagination>
  );
};

export default AccountTablePagination;
