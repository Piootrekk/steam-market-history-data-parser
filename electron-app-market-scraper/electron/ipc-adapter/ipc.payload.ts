type EventHandlers = {
  "init:setup-check": {
    args: string[];
    response: void;
  };
  "db:getAllUsers": {
    args: [];
    response: Promise<string[]>;
  };
  "fetch:all:start": {
    args: [steamId: string, cookies: string];
    response: Promise<{ jobId: string }>;
  };
  "fetch:all:progress": {
    args: [
      jobId: string,
      current: number,
      total: number,
      status: string,
      timestamp: number,
      message?: string
    ];
    response: void;
  };
};

type Channel = keyof EventHandlers;

type HandlerArgs<K extends Channel> = EventHandlers[K]["args"];
type HandlerResponse<K extends Channel> = EventHandlers[K]["response"];

type HandlerFn<K extends Channel> = (
  ...args: HandlerArgs<K>
) => HandlerResponse<K>;

type HandlerFnWithEvent<K extends Channel> = (
  event: Electron.IpcMainInvokeEvent,
  ...args: HandlerArgs<K>
) => HandlerResponse<K>;

export type {
  EventHandlers,
  Channel,
  HandlerArgs,
  HandlerResponse,
  HandlerFn,
  HandlerFnWithEvent,
};
