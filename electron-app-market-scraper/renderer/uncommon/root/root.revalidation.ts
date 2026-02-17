import type { ShouldRevalidateFunctionArgs } from "react-router-dom";
import { ROUTE_PATHS } from "@renderer/routes";

const shouldRevalidateRoot = ({
  actionResult,
  formAction,
}: ShouldRevalidateFunctionArgs): boolean => {
  const isCorrectPathAction = formAction === `/${ROUTE_PATHS.downloadAll}`;
  if (!isCorrectPathAction) return false;
  if (actionResult?.error) return false;
  return true;
};

export { shouldRevalidateRoot };
