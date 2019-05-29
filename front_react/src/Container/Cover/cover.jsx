import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Cover_img from "../../Components/cover";
import "./cover.css";
export default class Cover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: ""
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div id="coverPage" className="h-100 ">
        <Cover_img />
        <Button className="fixed-bottom" variant="secondary" size="lg" block>
          ENTER
        </Button>
      </div>
    );
  }
}
