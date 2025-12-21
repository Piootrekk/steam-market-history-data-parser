type AppEventHandlers = {
  "init-setup-check": (...value: string[]) => void;
  "db:getAllUsers": () => Promise<unknown>;
};

export type { AppEventHandlers };
