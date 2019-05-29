import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Cover_img from "../../Components/cover";
import jwt_decode from "jwt-decode";
export default class Cover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: ""
    };
  }

  componentDidMount() {
    document.body.style.background = "#07a995";
  }

  enterAppHandler = event => {
    console.log("button clicked");
    const getToken = localStorage.getItem("jwToken");
    if (getToken) {
      console.log("gotToken");
      const decodeToken = jwt_decode(getToken);
      const currentTime = Date.now() / 1000;
      if (decodeToken.exp >= currentTime) {
        this.props.history.replace("/profile");
      }
    } else {
      console.log("notoken");
      this.props.history.replace("/login");
    }
  };

  render() {
    return (
      <div id="coverPage" className="h-100 ">
        <Cover_img />
        <Button
          className="fixed-bottom"
          variant="secondary"
          size="lg"
          block
          onClick={this.enterAppHandler.bind(this)}
        >
          ENTER
        </Button>
      </div>
    );
  }
}
