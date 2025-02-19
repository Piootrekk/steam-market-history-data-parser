import DatabaseIcon from "@/common/icons/DatabaseIcon";

type SynchronizeHistoryInventoryProps = {
  inventoryHistoryCollectionsName: string[];
  isLoadingButton: boolean;
  setColName: (coll: string) => void;
};

const SynchronizeHistoryInventory: React.FC<
  SynchronizeHistoryInventoryProps
> = ({ inventoryHistoryCollectionsName, isLoadingButton }) => {
  return (
    <section className="section">
      <h2 className="section-title">Synchronize inventory</h2>
      <form className="input-group">
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

export default SynchronizeHistoryInventory;
