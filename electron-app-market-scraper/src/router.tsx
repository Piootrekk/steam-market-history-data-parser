import { HashRouter, Route, Routes } from "react-router-dom";
import LeftNavLayout from "./uncommon/layout/left-nav-layout";
import { ROUTES } from "./routes";

const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path={ROUTES.dashboard.to} element={<LeftNavLayout />}>
          <Route index element={ROUTES.dashboard.component} />
          <Route
            path={ROUTES.download.to}
            element={ROUTES.download.component}
          />
          <Route
            path={ROUTES.accounts.to}
            element={ROUTES.accounts.component}
          />
          <Route
            path={ROUTES.settings.to}
            element={ROUTES.settings.component}
          />
          <Route path={ROUTES.about.to} element={ROUTES.about.component} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default Router;
