import { protocol } from "electron";
import { appImagesHandler } from "./app-images/app-images.handler";

const registerAllProtocols = () => {
  protocol.handle("app-images", appImagesHandler);
};

export { registerAllProtocols };
