type AllHistoryInventoryProps = {
  disableButton: boolean;
};

const AllHistoryInventory: React.FC<AllHistoryInventoryProps> = ({
  disableButton,
}) => {
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
        <button className="button" disabled={disableButton}>
          Fetch
        </button>
      </form>
    </section>
  );
};

export default AllHistoryInventory;
