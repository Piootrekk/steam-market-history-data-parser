type AllHistoryInventoryProps = {};
const AllHistoryInventory: React.FC<AllHistoryInventoryProps> = ({}) => {
  return (
    <section className="section">
      <h2 className="section-title">Fetch All inventory</h2>
      <div className="input-group">
        <input type="text" placeholder="Identifier" className="input" />
        <input type="text" placeholder="Cookies" className="input" />
        <button className="button">Fetch</button>
      </div>
    </section>
  );
};

export default AllHistoryInventory;
