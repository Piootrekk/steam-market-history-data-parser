const EVENTS: Record<string, string> = {
  "3": "Sold",
  "4": "Bought",
} as const;

const getTransformedEvent = (event: string | number): string => {
  const convertedToString = event.toString();
  const actionEvent = EVENTS[convertedToString];
  if (actionEvent === undefined) throw new Error("Invalid actionEvent");
  return actionEvent;
};

export { getTransformedEvent };
