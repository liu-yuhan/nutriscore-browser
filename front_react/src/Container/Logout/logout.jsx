import React, { Component } from "react";

export default class Logout extends Component {

  componentWillMount() {
    const getToken = localStorage.getItem("jwToken");
    if (getToken) {
      localStorage.removeItem("jwToken");
    }
    this.props.history.replace('/login')
  }

  render() {
    return <div>delete </div>;
  }
}
