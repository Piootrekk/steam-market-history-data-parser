import { createHashRouter, RouterProvider } from "react-router-dom";
import DashboardPage from "./uncommon/dashboard/dashboard.page";
import DownloadAllPage from "./uncommon/fetch-all/download.page";
import RootWithNavLayout from "./uncommon/root/root-with-nav.layout";
import { usersNavLoader } from "./uncommon/root/navbar/sidebar.loader";
import { ROUTE_PATHS } from "./routes";
import AccountsLayout from "./uncommon/accounts/accounts.layout";
import { fetchAllHistortyAction } from "./uncommon/fetch-all/download.action";
import AccountTablePage from "./uncommon/accounts/table/account-table.page";
import { accountTableLoader } from "./uncommon/accounts/table/accout-table.loader";
import ErrorPage from "./uncommon/error/error.page";
import { shouldRevalidateRoot } from "./uncommon/root/root.revalidation";
import SyncListingsPage from "./uncommon/accounts/sync/sync-listings.page";
import { syncFetchAction } from "./uncommon/accounts/sync/sync-listings.action";
import AccountAllPage from "./uncommon/account-all/account-all.page";
import { allTableLoader } from "./uncommon/account-all/account-all.loader";

const router = createHashRouter([
  {
    path: ROUTE_PATHS.root,
    element: <RootWithNavLayout />,
    loader: usersNavLoader,
    errorElement: <ErrorPage />,
    shouldRevalidate: shouldRevalidateRoot,
    children: [
      {
        index: true,
        path: ROUTE_PATHS.dashboard,
        element: <DashboardPage />,
      },
      {
        path: ROUTE_PATHS.downloadAll,
        element: <DownloadAllPage />,
        action: fetchAllHistortyAction,
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
            element: <AccountAllPage />,
            loader: allTableLoader,
          },
          {
            path: ROUTE_PATHS.account,
            element: <AccountsLayout />,
            children: [
              {
                index: true,
                path: ROUTE_PATHS.accountTable,
                element: <AccountTablePage />,
                loader: accountTableLoader,
              },
              {
                path: ROUTE_PATHS.accountSync,
                element: <SyncListingsPage />,
                action: syncFetchAction,
              },
              { path: ROUTE_PATHS.accountConfig, element: <></> },
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
