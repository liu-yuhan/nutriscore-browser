import React, { Component } from "react";
import Chart from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Axios from "axios";

export default class Donut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scanData: {}
    };
  }

  componentDidMount() {
    Axios.get(
      "https://fr.openfoodfacts.org/api/V0/produit/" + this.props.id + ".json"
    )
      .then(result => {
        this.setState({ scanData: result.data });
        console.log("je suis les props ", result);
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className="mydonut">
        <canvas id="doughnut-chart" width="200" height="200" />
        <Doughnut
          data={this.state.scanData}
          width={100}
          height={50}
          options={{ maintainAspectRatio: false }}
        />
      </div>
    );
  }
}
