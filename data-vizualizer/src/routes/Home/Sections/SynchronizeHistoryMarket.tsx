import { TWsSendToServer } from "@/api/types/ws.types";
import DatabaseIcon from "@/common/icons/DatabaseIcon";
import { getWsBackend } from "@/common/utils/env";

type SynchronizeHistoryMarketProps = {
  marketHistoryCollectionsName: string[];
  isLoadingButton: boolean;
  webSocketAction: (url: string, sendPayload: TWsSendToServer) => void;
};

const SynchronizeHistoryMarket: React.FC<SynchronizeHistoryMarketProps> = ({
  marketHistoryCollectionsName,
  isLoadingButton: disableButton,
  webSocketAction,
}) => {
  const wsConnection = getWsBackend();
  wsConnection.pathname += "/market-history/sync";
  const url = wsConnection.href;
  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = {
      steamid: formData.get("market-sync") as string,
      cookies: formData.get("cookies") as string,
    };
    console.log(formValues);
    webSocketAction(url, formValues);
  };
  return (
    <section className="section">
      <h2 className="section-title">Synchronize market</h2>
      <form className="input-group" onSubmit={handleForm}>
        <div className="badges-group">
          {marketHistoryCollectionsName.map((collection, key) => {
            return (
              <div key={collection}>
                <input
                  type="radio"
                  id={`marketid-${key}`}
                  name="market-sync"
                  className="badge-radio"
                  defaultChecked={key === 0}
                  value={collection}
                />
                <label htmlFor={`marketid-${key}`} className="badge-label">
                  <DatabaseIcon size={16} className="badge-icon" />
                  {collection}
                </label>
              </div>
            );
          })}
        </div>
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

export default SynchronizeHistoryMarket;
