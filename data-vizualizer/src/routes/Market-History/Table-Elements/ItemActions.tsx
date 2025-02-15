type ItemActionsProps = {
  inspect?: string;
  wiki?: string;
  name: string;
  appid: number;
};

const ItemActions: React.FC<ItemActionsProps> = ({
  inspect,
  wiki,
  name,
  appid,
}) => {
  return (
    <div className="actions">
      <button className="action-btn">
        <a
          target="_blank"
          href={`https://steamcommunity.com/market/listings/${appid}/${encodeURIComponent(
            name
          )}`}
        >
          Market
        </a>
      </button>
      {wiki && (
        <button className="action-btn">
          <a target="_blank" href={wiki}>
            Wiki
          </a>
        </button>
      )}
      {inspect && (
        <button className="action-btn">
          <a target="_blank" href={inspect}>
            Inspect
          </a>
        </button>
      )}
    </div>
  );
};

export default ItemActions;
