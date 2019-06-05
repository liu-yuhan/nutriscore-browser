import React, { Component } from "react";
import "./res_style.css";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="headNav navbar navbar-expand-lg fixed-top">
        <img className="headNav_logo" src="final.gif" />
      </nav>
    );
  }
}
