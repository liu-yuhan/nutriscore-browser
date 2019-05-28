import React, { Component } from "react";

export default class Logout extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const getToken = localStorage.getItem("jwToken");
    if (getToken) {
      localStorage.removeItem("jwToken");
    }
  }

  render() {
    return <div>delete </div>;
  }
}
