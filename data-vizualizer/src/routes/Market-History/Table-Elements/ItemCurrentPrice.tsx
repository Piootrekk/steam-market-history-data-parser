import { getPrice } from "@/api/fetchPrice";
import Loader from "@/common/icons/Loader";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ItemCurrentPriceProps = {
  name: string;
  game: number;
};

const ItemCurrentPrice: React.FC<ItemCurrentPriceProps> = ({ name, game }) => {
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
  if (mutation.isSuccess)
    return (
      <div className="current-price">
        <span>{mutation.data}</span>
      </div>
    );

  return (
    <div className="actions">
      <button
        className="action-btn"
        disabled={mutation.isPending}
        onClick={() => mutation.mutate()}
      >
        {mutation.isPending ? <Loader size={24} /> : "Fetch"}
      </button>
    </div>
  );
};
export default ItemCurrentPrice;
