import React, { Component } from "react";
import Axios from "axios";
import Navbar from "../Components/navbar";

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
      <>
        <Navbar />
        <div
          className="card mb-2 mx-auto py-auto"
          style={{
            marginTop: 100,
            marginLeft: 100,
            height: "mx-auto py-auto",
            width: 400
          }}
        >
          <div className="row no-gutters">
            <div className="col-md-4">
              {this.state.resultScan ? (
                <img
                  src={this.state.resultScan.product.image_front_url}
                  className="card-img img-fluid mx-auto py-auto"
                  alt="..."
                />
              ) : null}
            </div>
            <div className="">
              <div className="card-body">
                {!this.state.resultScan ? (
                  <div>Chargement des données en cours</div>
                ) : !this.state.resultScan.product.product_name ? (
                  <div className="">
                    <p>Produit non trouvé</p>
                  </div>
                ) : (
                  <>
                    <h5 className="card-title">
                      {this.state.resultScan.product.product_name}
                    </h5>
                    <p className="card-text">
                      {this.state.resultScan.product.origins === ""
                        ? "Non définie"
                        : this.state.resultScan.product.origins}
                    </p>
                    <p className="card-text">
                      {this.state.resultScan.product
                        .ingredients_from_palm_oil_n === "1"
                        ? "Oui"
                        : "Non"}
                    </p>
                    <p className="">
                      Packaging : {this.state.resultScan.product.packaging}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Result;
