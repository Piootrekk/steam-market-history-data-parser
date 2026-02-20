type ValidationReturn<T> =
  | ({ ok: true } & T)
  | {
      ok: false;
      error: string;
    };

export type { ValidationReturn };
