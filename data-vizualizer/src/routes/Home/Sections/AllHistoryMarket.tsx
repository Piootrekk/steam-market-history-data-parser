import { TWsSendToServer } from "@/api/types/ws.types";
type AllHistoryMarketProps = {
  disableButton: boolean;
  webSocketAction: (url: string, sendPayload: TWsSendToServer) => void;
};

const AllHistoryMarket: React.FC<AllHistoryMarketProps> = ({
  disableButton,
  webSocketAction,
}) => {
  const url = "ws://127.0.0.1:3034/ws/market-history/all";
  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = {
      steamid: formData.get("steamid") as string,
      cookies: formData.get("cookies") as string,
    };
    webSocketAction(url, formValues);
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
        <button className="button" disabled={disableButton}>
          Fetch
        </button>
      </form>
    </section>
  );
};

export default AllHistoryMarket;
