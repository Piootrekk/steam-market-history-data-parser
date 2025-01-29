import DatabaseIcon from "@/common/icons/DatabaseIcon";

type SynchronizeHistoryMarketProps = {
  marketHistoryCollectionsName: string[];
  disableButton: boolean;
};

const SynchronizeHistoryMarket: React.FC<SynchronizeHistoryMarketProps> = ({
  marketHistoryCollectionsName,
  disableButton,
}) => {
  return (
    <section className="section">
      <h2 className="section-title">Synchronize market</h2>
      <div className="input-group">
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
                />
                <label htmlFor={`marketid-${key}`} className="badge-label">
                  <DatabaseIcon size={16} className="badge-icon" />
                  {collection}
                </label>
              </div>
            );
          })}
        </div>
        <input type="text" placeholder="Cookies" className="input" />
        <button className="button" disabled={disableButton}>
          Fetch
        </button>
      </div>
    </section>
  );
};

export default SynchronizeHistoryMarket;
