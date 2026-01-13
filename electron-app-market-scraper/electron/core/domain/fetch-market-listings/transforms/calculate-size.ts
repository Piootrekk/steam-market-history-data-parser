import type { TransformDto } from "../fetch/listing.dto";

type FetchIteration = {
  index: number;
  min: number;
  count: number;
};

const ReduceSizeDto = (
  responseDto: TransformDto,
  expectedSize: number
): TransformDto => {
  return responseDto.slice(0, expectedSize);
};

const calculateRestBatches = (count: number, totalCount: number) => {
  const remainingFetches = Math.ceil((totalCount - count) / count);
  const fetchesCalc: FetchIteration[] = Array.from(
    { length: remainingFetches },
    (_, index) =>
      ({
        index,
        min: index * count + count,
        count,
      } satisfies FetchIteration)
  );
  return fetchesCalc;
};

export { ReduceSizeDto, calculateRestBatches };
export type { FetchIteration };
