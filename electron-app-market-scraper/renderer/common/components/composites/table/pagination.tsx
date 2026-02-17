import {
  ChevronLeftPagination,
  ChevronRightPagination,
  PagePagination,
  Ellipsis,
  Pagination,
} from "@renderer/common/components/composites/table/table-pagination";
import { TABLE_PARAMS } from "@renderer/routes";

type PaginationProps = {
  urlSearchParams: URLSearchParams;
  totalCount: number;
};

const getPageCount = (totalCount: number, limit: number) => {
  return Math.ceil(totalCount / limit);
};

const getCurrentPage = (startParam: number, limit: number) => {
  return Math.ceil(startParam / limit + 1);
};

const getStartParam = (page: number, limit: number) => {
  return (page - 1) * limit;
};

const getParamsFromURLSearchParams = (urlSearchParams: URLSearchParams) => {
  const startParam = Number(urlSearchParams.get(TABLE_PARAMS.start) ?? 0);
  const limit = Number(urlSearchParams.get(TABLE_PARAMS.limit) ?? 50);
  return { startParam, limit };
};

const getPathParams = (
  urlSearchParams: URLSearchParams,
  newPage: number,
  limit: number,
) => {
  const startParam = getStartParam(newPage, limit);
  const params = new URLSearchParams(urlSearchParams);
  params.set("start", startParam.toString());
  params.set("limit", limit.toString());
  return params.toString();
};

const TablePagination = ({
  urlSearchParams: params,
  totalCount,
}: PaginationProps) => {
  const { startParam, limit } = getParamsFromURLSearchParams(params);
  if (totalCount <= limit) return null;
  const totalPages = getPageCount(totalCount, limit);
  const currentPage = getCurrentPage(startParam, limit);
  const showLeftEllipsis = currentPage > 3;
  const showRightEllipsis = currentPage < totalPages - 2;
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  return (
    <Pagination>
      <ChevronLeftPagination
        to={`?${getPathParams(params, prevPage, limit)}`}
        page={prevPage}
      />
      <PagePagination
        to={`?${getPathParams(params, 1, limit)}`}
        page={1}
        isCurrentPage={currentPage === 1}
      />
      {showLeftEllipsis && <Ellipsis />}
      {prevPage > 1 && (
        <PagePagination
          page={prevPage}
          to={`?${getPathParams(params, prevPage, limit)}`}
        />
      )}
      {currentPage !== 1 && currentPage < totalPages && (
        <PagePagination
          page={currentPage}
          to={`?${getPathParams(params, currentPage, limit)}`}
          isCurrentPage={currentPage !== 1 && currentPage !== totalPages}
        />
      )}
      {nextPage < totalPages && (
        <PagePagination
          page={nextPage}
          to={`?${getPathParams(params, nextPage, limit)}`}
        />
      )}
      {showRightEllipsis && <Ellipsis />}
      <PagePagination
        to={`?${getPathParams(params, totalPages, limit)}`}
        page={totalPages}
        isCurrentPage={currentPage === totalPages}
      />
      <ChevronRightPagination
        to={`?${getPathParams(params, nextPage, limit)}`}
        page={nextPage}
        maxPage={totalPages}
      />
    </Pagination>
  );
};

export default TablePagination;
