import {
  createRootRoute,
  createRoute,
  createRouter,
  getRouteApi,
} from "@tanstack/react-router";
import Layout from "./Layout/Layout";
import { lazy } from "react";
import { TMarketHistorySearchParams } from "./router.types";

const Home = lazy(() => import("./Home/Home"));
const InventoryHistory = lazy(
  () => import("./Inventory-History/InventoryHistory")
);

const TransactionOverview = lazy(() => import("@/TransactionOverview"));

const MarketHistory = lazy(() => import("./Market-History/MarketHistory"));
const rootRoute = createRootRoute({
  component: Layout,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const marketHistoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/market-history",
  component: MarketHistory,
  validateSearch: (
    search: TMarketHistorySearchParams
  ): TMarketHistorySearchParams => ({
    skip: search.skip || undefined,
    limit: search.limit || undefined,
    collectionName: search.collectionName,
    search: search.search || undefined,
  }),
});

const inventoryHistoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/inventory-history",
  component: InventoryHistory,
});

const oldTableDisplay = createRoute({
  getParentRoute: () => rootRoute,
  path: "/old-table",
  component: TransactionOverview,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  inventoryHistoryRoute,
  marketHistoryRoute,
  oldTableDisplay,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const routeApiMarketHistory = getRouteApi("/market-history");

export default router;
export { routeApiMarketHistory };
