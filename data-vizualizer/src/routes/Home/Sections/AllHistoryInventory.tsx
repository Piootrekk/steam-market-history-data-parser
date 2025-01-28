type AllHistoryInventoryProps = {};

const AllHistoryInventory: React.FC<AllHistoryInventoryProps> = ({}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  return (
    <section className="section">
      <h2 className="section-title">Fetch All inventory</h2>
      <form className="input-group" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Identifier"
          className="input"
          name="steamId"
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

export default AllHistoryInventory;
