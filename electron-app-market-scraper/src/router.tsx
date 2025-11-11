import { HashRouter, Route, Routes } from "react-router-dom";
import LeftNavLayout from "./uncommon/layout/left-nav-layout";
import Dashboard from "./uncommon/dashboard/dashboard";

const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LeftNavLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default Router;
