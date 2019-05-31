import React, { Component } from "react";
import Axios from "axios";
import Navbar from "../Components/navbar";
import Donut from "../Components/donut";
import DonutChart from "react-donut-chart";

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idScan: ""
    };
  }

  componentDidMount() {
    console.log("result props: ", this.props);
    const Token = localStorage.getItem("jwToken");
    Axios.get(
      "https://fr.openfoodfacts.org/api/V0/produit/" +
        this.props.match.params.id +
        ".json"
    )
      .then(result => {
        this.setState({ resultScan: result.data });
        console.log(result.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <>
        <Navbar />
        <div className="row no-gutters card1">
          <div className="col-md-4">
            {this.state.resultScan ? (
              <img
                src={this.state.resultScan.product.image_front_url}
                className="card-img img-responsive img2"
                alt="..."
              />
            ) : null}
          </div>

          <div className="">
            <div className="card-body productPic">
              {!this.state.resultScan ? (
                <div>Chargement des données en cours</div>
              ) : !this.state.resultScan.product.product_name ? (
                <div>
                  <p>Produit non trouvé</p>
                </div>
              ) : (
                <>
                  <div className="genericName">
                    <h5>
                      {this.state.resultScan.product.generic_name}
                      <br />
                      <small>
                        {this.state.resultScan.product.product_name}
                      </small>
                    </h5>
                  </div>
                  <br />
                  <br />
                  <br />

                  <p className="card-text">
                    Product origin :
                    {this.state.resultScan.product.origins === ""
                      ? "Non définie"
                      : this.state.resultScan.product.origins}
                  </p>
                  <p className="card-text">
                    {" "}
                    Oil palm :
                    {this.state.resultScan.product
                      .ingredients_from_palm_oil_n === "1"
                      ? "Oui"
                      : "Non"}
                  </p>
                  <p className="">
                    Packaging : {this.state.resultScan.product.packaging}
                  </p>
                  <DonutChart
                    width="420"
                    data={[
                      {
                        label: "Glucides",
                        value: 12 //this.state.resultScan.product.packaging
                      },
                      {
                        label: "Lipides",
                        value: 64
                      },
                      {
                        label: "Protide",
                        value: 13
                      }
                    ]}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Result;
