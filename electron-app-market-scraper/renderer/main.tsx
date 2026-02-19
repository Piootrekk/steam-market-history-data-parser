import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app";
import { getBasePrefersColorSchema } from "./common/utils/theme";
import { initLocalStorage } from "./common/hooks/local-storage.hook";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

document.body.setAttribute("data-theme", getBasePrefersColorSchema());
initLocalStorage("ui-config");
window.electronAPI.setupCheck((value) => {
  console.log("Initialize desktop app: ", value);
});
