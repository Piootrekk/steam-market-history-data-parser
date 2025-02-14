import { Link, Outlet } from "@tanstack/react-router";
import "./layout.css";
import InventoryIcon from "../../common/icons/InventoryIcon";
import MarketIcon from "../../common/icons/MarketIcon";

type LayoutProps = {};

const Layout: React.FC<LayoutProps> = () => {
  const activeProps = {
    className: "nav-link-active",
  };
  return (
    <div>
      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="nav-link" activeProps={activeProps}>
              <h1 className="header-title">Personal Data Parser</h1>
            </Link>
            <nav className="nav">
              <Link
                to="/market-history"
                className="nav-link"
                activeProps={activeProps}
                search={{ collectionName: "MH-sec" }}
              >
                <MarketIcon size={20} />
                Market History
              </Link>
              <Link
                to="/inventory-history"
                className="nav-link"
                activeProps={activeProps}
              >
                <InventoryIcon size={20} />
                Inventory History
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="main container">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
