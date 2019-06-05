import React, { Component } from "react";
import "./res_style.css";

export default class Cover_img extends Component {
  render() {
    return (
      <div id="cover_image" className="h-100">
        <img id="cover_logo" src="final.gif" />
        <h1 id="cover_title" className="mx-auto text-center">
          PINE APP
        </h1>
      </div>
    );
  }
}
