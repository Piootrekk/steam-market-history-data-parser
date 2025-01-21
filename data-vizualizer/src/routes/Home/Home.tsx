import "./home.css";
type HomeProps = {};

const Home: React.FC<HomeProps> = ({}) => {
    
  return (
    <div className="sections-container">
      <section className="section">
        <h2 className="section-title">Fetch All market History</h2>
        <div className="input-group">
          <input type="text" placeholder="Identifier" className="input" />
          <input type="text" placeholder="Cookies" className="input" />
          <button className="button">Fetch</button>
        </div>
      </section>
      <section className="section">
        <h2 className="section-title">Fetch All market History</h2>
        <div className="input-group">
          <input type="text" placeholder="Identifier" className="input" />
          <input type="text" placeholder="Cookies" className="input" />
          <button className="button">Fetch</button>
        </div>
      </section>
      <section className="section">
        <h2 className="section-title">Fetch All market History</h2>
        <div className="input-group">
          <input type="text" placeholder="Identifier" className="input" />
          <input type="text" placeholder="Cookies" className="input" />
          <button className="button">Fetch</button>
        </div>
      </section>
      <section className="section">
        <h2 className="section-title">Fetch All market History</h2>
        <div className="input-group">
          <input type="text" placeholder="Identifier" className="input" />
          <input type="text" placeholder="Cookies" className="input" />
          <button className="button">Fetch</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
