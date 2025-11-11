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
            path={ROUTES.analytics.to}
            element={ROUTES.analytics.component}
          />
          <Route path={ROUTES.history.to} element={ROUTES.history.component} />
          <Route
            path={ROUTES.settings.to}
            element={ROUTES.settings.component}
          />
          <Route path={ROUTES.revenue.to} element={ROUTES.revenue.component} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default Router;
