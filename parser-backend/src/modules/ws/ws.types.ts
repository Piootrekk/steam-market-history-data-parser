type TErrorPayload = {
  type: "error" | "close";
  message: string;
};

export type { TErrorPayload };
