import type { channels } from "./ipc.payload";

type ChannelKey = keyof typeof channels;
type ChannelValue = (typeof channels)[keyof typeof channels];

type Channel<V extends ChannelValue> = {
  [K in ChannelKey]: (typeof channels)[K] extends V ? K : never;
}[ChannelKey];

type MethodOrCallbackResponse<T> = T extends (
  ...args: infer Params
) => infer Return
  ? Params extends [infer First, ...unknown[]]
    ? First extends (...args: infer _CallbackArgs) => infer CallbackReturn
      ? CallbackReturn
      : Return
    : Return
  : never;

type HandlerResponse<K extends ChannelValue> = MethodOrCallbackResponse<
  Window["electronAPI"][Channel<K>]
>;

type MethodOrCallbackArgs<T> = T extends (...args: infer Params) => unknown
  ? Params extends [infer First, ...unknown[]]
    ? First extends (...args: infer CallbackArgs) => unknown
      ? CallbackArgs
      : Params
    : Params
  : never;

type HandlerArgs<K extends ChannelValue> = MethodOrCallbackArgs<
  Window["electronAPI"][Channel<K>]
>;

type HandlerFn<K extends ChannelValue> = (
  ...args: HandlerArgs<K>
) => HandlerResponse<K>;

type HandlerFnWithEvent<K extends ChannelValue> = (
  event: Electron.IpcMainInvokeEvent,
  ...args: HandlerArgs<K>
) => HandlerResponse<K>;

export type {
  ChannelValue,
  Channel,
  HandlerResponse,
  HandlerArgs,
  HandlerFn,
  HandlerFnWithEvent,
};
