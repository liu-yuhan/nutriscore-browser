import React, { Component } from "react";
import Axios from "axios";

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idScan: ""
    };
  }

  componentDidMount() {
    Axios.get(
      "https://fr.openfoodfacts.org/api/V0/produit/" +
        this.props.match.params.id +
        ".json"
    )
      .then(result => {
        this.setState({ resultScan: result.data });

        console.log(this.state.resultScan.product.product_name);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        {!this.state.resultScan ? (
          <div>Chargement des données en cours</div>
        ) : !this.state.resultScan.product.product_name ? (
          <div className="jumbotron mx-auto mt-2">
            <p>Produit non trouvé</p>
          </div>
        ) : (
          <div className="jumbotron mx-auto mt-2">
            Hello, you're on page {this.props.match.params.id}
            <br />
            Le produit est du : {this.state.resultScan.product.product_name}
            <br />
            Origine :{" "}
            {this.state.resultScan.product.origins == ""
              ? "Non définie"
              : this.state.resultScan.product.origins}
            <br />
            <img
              className="text-right"
              src={this.state.resultScan.product.image_front_url}
            />
            <br />
            Huile de Palme :{" "}
            {this.state.resultScan.product.ingredients_from_palm_oil_n == "1"
              ? "Oui"
              : "Non"}
            <br />
            Packaging : {this.state.resultScan.product.packaging}
          </div>
        )}
      </div>
    );
  }
}

export default Result;
