import { useQuery } from "@tanstack/react-query";
import "./home.css";
import { getMarketHistoryCollectionsName } from "../../api/marketHistory";
import DatabaseIcon from "../../common/icons/DatabaseIcon";
import { getInventoryHistoryCollectionsName } from "@/api/inventoryHistory";
type HomeProps = {};

const Home: React.FC<HomeProps> = ({}) => {
  const marketHistoryCollectionsName = useQuery<string[]>({
    queryKey: ["marketCollectionsName"],
    queryFn: getMarketHistoryCollectionsName,
  });
  const inventoryHistoryCollectionsName = useQuery<string[]>({
    queryKey: ["inventoryCollectionsName"],
    queryFn: getInventoryHistoryCollectionsName,
  });

  if (
    marketHistoryCollectionsName.error ||
    marketHistoryCollectionsName.data === undefined
  ) {
    return <h2>ERROR FETCH Market history </h2>;
  }

  if (
    inventoryHistoryCollectionsName.error ||
    inventoryHistoryCollectionsName.data === undefined
  ) {
    return <h2>ERROR FETCH Inv history</h2>;
  }

  return (
    <div className="sections-container">
      <section className="section">
        <h2 className="section-title">Fetch All market</h2>
        <div className="input-group">
          <input type="text" placeholder="Identifier" className="input" />
          <input type="text" placeholder="Cookies" className="input" />
          <button className="button">Fetch</button>
        </div>
      </section>
      <section className="section">
        <h2 className="section-title">Fetch All inventory</h2>
        <div className="input-group">
          <input type="text" placeholder="Identifier" className="input" />
          <input type="text" placeholder="Cookies" className="input" />
          <button className="button">Fetch</button>
        </div>
      </section>
      <section className="section">
        <h2 className="section-title">Synchronize market</h2>
        <div className="input-group">
          <div className="badges-group">
            {marketHistoryCollectionsName.data.map((collection, key) => {
              return (
                <div key={collection}>
                  <input
                    type="radio"
                    id={`marketid-${key}`}
                    name="market-sync"
                    className="badge-radio"
                    checked={key === 0}
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
          <button className="button">Fetch</button>
        </div>
      </section>
      <section className="section">
        <h2 className="section-title">Synchronize inventory</h2>
        <div className="input-group">
          <div className="badges-group">
            {inventoryHistoryCollectionsName.data.map((collection, key) => {
              return (
                <div key={collection}>
                  <input
                    type="radio"
                    id={`inventoryid-${key}`}
                    name="inventory-sync"
                    className="badge-radio"
                    checked={key === 0}
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
          <button className="button">Fetch</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
