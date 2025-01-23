import { useMutation } from "@tanstack/react-query";

type AllHistoryMarketProps = {};

const AllHistoryMarket: React.FC<AllHistoryMarketProps> = ({}) => {
  const mutation = useMutation({
    mutationKey: ["FetchAllHistoryMarket"],
    mutationFn: undefined,
  });

  return (
    <section className="section">
      <h2 className="section-title">Fetch All market</h2>
      <div className="input-group">
        <input type="text" placeholder="Identifier" className="input" />
        <input type="text" placeholder="Cookies" className="input" />
        <button disabled={mutation.isPending} className="button">
          Fetch
        </button>
      </div>
    </section>
  );
};

export default AllHistoryMarket;
