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
      <a
        className="action-btn"
        target="_blank"
        href={`https://steamcommunity.com/market/listings/${appid}/${encodeURIComponent(
          name
        )}`}
      >
        Market
      </a>

      {wiki && (
        <a className="action-btn" target="_blank" href={wiki}>
          Wiki
        </a>
      )}
      {inspect && (
        <a className="action-btn" target="_blank" href={inspect}>
          Inspect
        </a>
      )}
    </div>
  );
};

export default ItemActions;
