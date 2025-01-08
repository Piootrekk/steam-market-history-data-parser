import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";
import TransactionOverview from "./TransactionOverview";
const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        gcTime: 1000 * 60 * 60 * 24,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <TransactionOverview />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
