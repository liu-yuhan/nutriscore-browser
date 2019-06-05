import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import "./res_style.css";

class Footer extends Component {
  render() {
    return (
      <div className="footer mx-auto py-auto">
        <Navbar className="footer" expand="lg" fixed="bottom">
          <NavLink className="col-3 text-center" to="/login">
            <FontAwesomeIcon className="icon_footer" icon="coffee" />
          </NavLink>
          <NavLink className="col-3 text-center" to="/logout">
            <FontAwesomeIcon className="icon_footer" icon="camera" />
          </NavLink>
          <NavLink className="col-3 text-center" to="/scan">
            <FontAwesomeIcon className="icon_footer" icon="barcode" />
          </NavLink>
          <NavLink className="col-3 text-center" to="/">
            <FontAwesomeIcon className="icon_footer" icon="stroopwafel" />
          </NavLink>
        </Navbar>
      </div>
    );
  }
}
export default Footer;
