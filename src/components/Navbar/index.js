import { GiBookshelf } from "react-icons/gi";
import { MdHome, MdBookmarks, MdShoppingCart } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./index.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light nav-container">
      <div className="container">
        <a className="navbar-brand logo-name" href="/">
          <GiBookshelf className="logo-icon" />
          <h1 className="name-h1">Book Bytes</h1>
        </a>
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
              <a className="nav-link logo-name" href="/">
                <MdHome className="icon-nav" />
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link logo-name" href="/bookbyte/saved">
                <MdBookmarks className="icon-nav" />
                Saved
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link logo-name" href="/bookbyte/cart">
                <MdShoppingCart className="icon-nav" />
                Cart
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
