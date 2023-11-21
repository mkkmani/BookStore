import "../../bootstrapSetup";

import { GiBookshelf } from "react-icons/gi";
import { FaFacebook, FaSquareInstagram, FaTwitter } from "react-icons/fa6";
import "./index.css";

const Footer = () => (
  <div className="container bg w-100">
    <div className="row">
      <div className="d-flex flex-column justify-content-center align-items-center p-3">
        <div className="col-12 d-flex flex-row justify-content-center align-items-center p-2">
          <GiBookshelf className="footer-logo" />
          <h1 className="mt-3 ml-2">Book Bytes</h1>
        </div>
        <p>Byte-Sized Brilliance: Find Software's Secrets in Every Chapter.</p>

        <p className="connect">Stay connected with us on</p>
        <div className="d-flex flex-row justify-content-around align-items-center">
          <FaFacebook className="social-icon" />
          <FaSquareInstagram className="social-icon" />
          <FaTwitter className="social-icon" />
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
