import { HashRouter, Route, Routes } from "react-router-dom";
import MainWithNavLayout from "./uncommon/navbar/sidebar.layout";
import { ACCOUNT_ROUTES, ROUTES } from "./routes";

const Router = () => {
  const { dashboard, downloadAll, downloadAmount, settings, about } = ROUTES;
  const { account1, account2, account3 } = ACCOUNT_ROUTES;
  return (
    <HashRouter>
      <Routes>
        <Route path={dashboard.path} element={<MainWithNavLayout />}>
          <Route index element={dashboard.element} />
          <Route {...downloadAll} />
          <Route {...downloadAmount} />
          <Route {...settings} />
          <Route {...about} />
          <Route {...account1} />
          <Route {...account2} />
          <Route {...account3} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default Router;
