import { getAllMarketHistory } from "@/api/marketHistory";

type AllHistoryMarketProps = {};

const AllHistoryMarket: React.FC<AllHistoryMarketProps> = ({}) => {
  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = {
      steamid: formData.get("steamid") as string,
      cookies: formData.get("cookies") as string,
    };
    await getAllMarketHistory(formValues.steamid, formValues.cookies);
  };

  return (
    <section className="section">
      <h2 className="section-title">Fetch All market</h2>
      <form className="input-group" onSubmit={handleForm}>
        <input
          type="text"
          placeholder="Identifier"
          className="input"
          name="steamid"
        />
        <input
          type="text"
          placeholder="Cookies"
          className="input"
          name="cookies"
        />
        <button className="button">Fetch</button>
      </form>
    </section>
  );
};

export default AllHistoryMarket;
