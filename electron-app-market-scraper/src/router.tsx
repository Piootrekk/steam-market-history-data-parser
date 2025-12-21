import { createHashRouter, RouterProvider } from "react-router-dom";
import MainWithNavLayout from "./uncommon/navbar/sidebar.layout";
import { usersNavLoader } from "./uncommon/navbar/sidebar.loader";
import DashboardPage from "./uncommon/dashboard/dashboard.page";
import DownloadAllPage from "./uncommon/fetch-all/download.page";
import { ROUTE_PATHS } from "./routes";
import AccountsLayout from "./uncommon/accounts/accounts.layout";

const router = createHashRouter([
  {
    path: ROUTE_PATHS.root,
    element: <MainWithNavLayout />,
    loader: usersNavLoader,
    children: [
      {
        index: true,
        path: ROUTE_PATHS.dashboard,
        element: <DashboardPage />,
      },
      {
        path: ROUTE_PATHS.downloadAll,
        element: <DownloadAllPage />,
      },
      {
        path: ROUTE_PATHS.downloadAmount,
        element: <DownloadAllPage />,
      },
      {
        path: ROUTE_PATHS.settings,
        element: <></>,
      },
      {
        path: ROUTE_PATHS.about,
        element: <></>,
      },
      {
        path: ROUTE_PATHS.accounts,
        children: [
          {
            path: ROUTE_PATHS.accountsAll,
            element: <></>,
          },
          {
            path: ROUTE_PATHS.account,
            element: <AccountsLayout />,
            children: [
              { index: true, path: ROUTE_PATHS.accountTable, element: <></> },
              { path: ROUTE_PATHS.accountSync, element: <></> },
              { path: ROUTE_PATHS.accountConfigDb, element: <></> },
            ],
          },
        ],
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
