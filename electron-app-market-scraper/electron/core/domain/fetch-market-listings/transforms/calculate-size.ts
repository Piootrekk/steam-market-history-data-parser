import type { TransformDto } from "./transform.dto";

type FetchIteration = {
  min: number;
  count: number;
};

const ReduceSizeDto = (
  responseDto: TransformDto[],
  expectedSize: number
): TransformDto[] => {
  return responseDto.slice(0, expectedSize);
};

const calculateBatches = (count: number, totalCount: number) => {
  const remainingFetches = Math.ceil((totalCount - count) / count);
  const fetchesCalc: FetchIteration[] = Array.from(
    { length: remainingFetches },
    (_, index) =>
      ({
        min: index * count + count,
        count,
      } satisfies FetchIteration)
  );
  return { remainingFetches, fetchesCalc };
};

export { ReduceSizeDto, calculateBatches };
export type { FetchIteration };
