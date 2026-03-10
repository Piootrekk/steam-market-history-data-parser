import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app";
import { initLocalStorage } from "./common/hooks/local-storage.hook";
import { getBasePrefersColorSchema } from "./common/utils/theme";

const root = document.getElementById("root");
if (root === null) throw new Error("React setup failed.");
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

document.body.setAttribute("data-theme", getBasePrefersColorSchema());
initLocalStorage("ui-config");
window.electronAPI.setupCheck((value) => {
  console.log("Initialize desktop app: ", value);
});
