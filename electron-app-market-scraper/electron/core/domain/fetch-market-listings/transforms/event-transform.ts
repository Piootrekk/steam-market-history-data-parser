const EVENTS: Record<string, string> = {
  "3": "sold",
  "4": "bought",
} as const;

const getTransformedEvent = (event: `${number}` | number): string => {
  const convertedToString = event.toString();
  const actionEvent = EVENTS[convertedToString];
  if (actionEvent === undefined) throw new Error("Invalid actionEvent");
  return actionEvent;
};

export { getTransformedEvent };
