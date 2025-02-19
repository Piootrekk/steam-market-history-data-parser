import { TWsSendToServer } from "@/api/types/ws.types";
import { getWsBackend } from "@/common/utils/env";
type AllHistoryMarketProps = {
  isLoadingButton: boolean;
  webSocketAction: (url: string, sendPayload: TWsSendToServer) => void;
};

const AllHistoryMarket: React.FC<AllHistoryMarketProps> = ({
  isLoadingButton,
  webSocketAction,
}) => {
  const wsConnection = getWsBackend();
  wsConnection.pathname += "/market-history/all";
  const url = wsConnection.href;
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
        <button className="button" disabled={isLoadingButton}>
          Fetch
        </button>
      </form>
    </section>
  );
};

export default AllHistoryMarket;
