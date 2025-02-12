import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";
import { RouterProvider } from "@tanstack/react-router";
import router from "./routes/router";
import HistoryCollectionsProvider from "./common/context/MarketHistoryContext";
import InventoryCollectionsProvider from "./common/context/InventoryContext";

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <HistoryCollectionsProvider>
        <InventoryCollectionsProvider>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </InventoryCollectionsProvider>
      </HistoryCollectionsProvider>
    </QueryClientProvider>
  );
};

export default App;
