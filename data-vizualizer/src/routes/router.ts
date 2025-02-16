import {
  createRootRoute,
  createRoute,
  createRouter,
  getRouteApi,
} from "@tanstack/react-router";
import Layout from "./Layout/Layout";
import MarketHistoryLayout from "./Market-History/MarketHistoryLayout";
import { lazy } from "react";
import type { TMarketHistorySearchParams } from "./router.types";

const Home = lazy(() => import("./Home/Home"));
const InventoryHistory = lazy(
  () => import("./Inventory-History/InventoryHistory")
);

const TransactionOverview = lazy(() => import("@/TransactionOverview"));

const MarketHistoryOverview = lazy(
  () => import("./Market-History/MarketHistoryOverview")
);

const rootRoute = createRootRoute({
  component: Layout,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const marketHistoryLayout = createRoute({
  getParentRoute: () => rootRoute,
  path: "/market-history",
  component: MarketHistoryLayout,
  validateSearch: (
    search: TMarketHistorySearchParams
  ): TMarketHistorySearchParams => ({
    skip: Number(search.skip) || undefined,
    limit: Number(search.limit) || undefined,
    collectionName: search.collectionName || undefined,
    search: search.search || undefined,
  }),
});

const MarketHistoryTableRoute = createRoute({
  getParentRoute: () => marketHistoryLayout,
  path: "/",
  component: MarketHistoryOverview,
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
  oldTableDisplay,
  marketHistoryLayout.addChildren([MarketHistoryTableRoute]),
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
