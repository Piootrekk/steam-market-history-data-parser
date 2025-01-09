import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getPrice } from "./utils/fetchPrice";
import Loader from "./icons/Loader";
type TPriceFetcher = {
  name: string;
  game: string;
};

const PriceFetcher: React.FC<TPriceFetcher> = ({ name, game }) => {
  const queryClient = useQueryClient();

  const handleMutation = async () => {
    const cachedData = queryClient.getQueryData<string>(["itemPrice", name]);
    if (cachedData) {
      return cachedData;
    }
    return getPrice(name, game);
  };

  const mutation = useMutation({
    mutationKey: ["itemPrice", name],
    mutationFn: handleMutation,
    onSuccess: (data) => {
      queryClient.setQueryData(["itemPrice", name], data);
    },
  });

  if (mutation.isError) return <span>{mutation.error.message}</span>;
  if (mutation.isSuccess) return <span>{mutation.data}</span>;

  return (
    <button
      className="action-btn"
      disabled={mutation.isPending}
      onClick={() => mutation.mutate()}
    >
      {mutation.isPending ? <Loader size={24} /> : "Fetch"}
    </button>
  );
};

export default PriceFetcher;
