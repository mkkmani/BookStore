import { GiBookshelf } from "react-icons/gi";
import { MdHome, MdBookmarks, MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import "./index.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light nav-container">
      <div className="container">
        <Link className="navbar-brand logo-name" to="/">
          <GiBookshelf className="logo-icon" />
          <h1 className="name-h1">Book Bytes</h1>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link logo-name" to="/">
                <MdHome className="icon-nav" />
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link logo-name" to="/saved">
                <MdBookmarks className="icon-nav" />
                Saved
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link logo-name" to="/cart">
                <MdShoppingCart className="icon-nav" />
                Cart
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
