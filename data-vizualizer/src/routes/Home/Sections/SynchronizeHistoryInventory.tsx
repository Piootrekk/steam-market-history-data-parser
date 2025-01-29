import DatabaseIcon from "@/common/icons/DatabaseIcon";

type SynchronizeHistoryInventoryProps = {
  inventoryHistoryCollectionsName: string[];
  disableButton: boolean;
};

const SynchronizeHistoryInventory: React.FC<
  SynchronizeHistoryInventoryProps
> = ({ inventoryHistoryCollectionsName, disableButton }) => {
  return (
    <section className="section">
      <h2 className="section-title">Synchronize inventory</h2>
      <div className="input-group">
        <div className="badges-group">
          {inventoryHistoryCollectionsName.map((collection, key) => {
            return (
              <div key={collection}>
                <input
                  type="radio"
                  id={`inventoryid-${key}`}
                  name="inventory-sync"
                  className="badge-radio"
                  defaultChecked={key === 0}
                />
                <label htmlFor={`inventoryid-${key}`} className="badge-label">
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

export default SynchronizeHistoryInventory;
