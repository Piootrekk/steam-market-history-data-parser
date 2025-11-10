import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app";
import { getBasePrefersColorSchema } from "./common/utils/get-prefers-theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

document.body.setAttribute("data-theme", getBasePrefersColorSchema());

window.ipcRenderer.on("main-process-message", (_event, message) => {
  console.log(message);
});
