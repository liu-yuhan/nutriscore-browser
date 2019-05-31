import React, { Component } from "react";
import Axios from "axios";
import { login } from "../redux/action";
import Navbar from "../Components/navbar";
import Donut from "../Components/donut";
import DonutChart from "react-donut-chart";

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idScan: ''
    };
  }

  componentDidMount() {
    //const getToken = localStorage.getItem("jwToken");
    Axios.get(
      'https://fr.openfoodfacts.org/api/V0/produit/' +
        this.props.match.params.id +
        '.json'
    )
      .then(result => {
        console.log("result", result.data);
        console.log('result', result.data);
        this.setState({ resultScan: result.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <>
        <Navbar />
        <div className='row no-gutters card1'>
          <div className='col-md-4'>
            {this.state.resultScan ? (
              <img
                src={this.state.resultScan.product.image_front_url}
                className='card-img img-responsive img2'
                alt='...'
              />
            ) : null}
          </div>

          <div className=''>
            <div className='card-body productPic'>
              {!this.state.resultScan ? (
                <div>Chargement des données en cours</div>
              ) : !this.state.resultScan.product.product_name ? (
                <div>
                  <p>Produit non trouvé</p>
                </div>
              ) : (
                <>
                  <div className='genericName'>
                    <h5>
                      {this.state.resultScan.product.generic_name}
                      <br />
                      <small>
                        {this.state.resultScan.product.product_name}
                      </small>
                    </h5>
                  </div>

                  <p className="card-text">
                    Calories :
                    {this.state.resultScan.product.nutriments.fat_value === ""
                      ? "Non définie"
                      : Math.floor(
                          this.state.resultScan.product.nutriments.fat_value * 9
                        )}
                  </p>
                  <DonutChart
                    className="donut"
                    height="300"
                    width="400"
                    data={[
                      {
                        label: 'Glucides',
                        value: this.state.resultScan.product.nutriments
                          .carbohydrates
                      },
                      {
                        label: 'lipides',
                        value: this.state.resultScan.product.nutriments
                          .fat_value
                      },
                      {
                        label: 'protéines',
                        value: this.state.resultScan.product.nutriments.proteins
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
