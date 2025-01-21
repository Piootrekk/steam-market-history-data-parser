import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Layout from "./Layout/Layout";
import { lazy } from "react";

const Home = lazy(() => import("./Home/Home"));
const InventoryHistory = lazy(
  () => import("./Inventory-History/InventoryHistory")
);
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
});

const inventoryHistoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/inventory-history",
  component: InventoryHistory,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  inventoryHistoryRoute,
  marketHistoryRoute,
]);

const router = createRouter({ routeTree });

export default router;
