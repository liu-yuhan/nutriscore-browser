import React, { Component } from "react";
import Axios from "axios";
import { login } from "../redux/action";
import Navbar from "../Components/navbar";
import Footer from "../Components/tabBar";
import DonutChart from "react-donut-chart";
import { Container, Row, Col, Image } from "react-bootstrap";
import getNutriScore from "../utils/getNutriScore";
import "./res_style.css";

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idScan: ""
    };
  }

  componentWillMount() {
    document.body.style.background = "#ffffff";
  }

  componentDidMount() {
    //const getToken = localStorage.getItem("jwToken");
    Axios.get(
      "https://fr.openfoodfacts.org/api/V0/produit/" +
        this.props.match.params.id +
        ".json"
    )
      .then(result => {
        console.log("result", result.data);
        console.log("result", result.data);
        this.setState({ resultScan: result.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const resultScan = this.state.resultScan;
    if (!resultScan) {
      return (
        <>
          <Navbar />
          <Container>
            <Row>
              <Col>
                <Image src="loading.jpg" alt="loading" fluid />
              </Col>
            </Row>
          </Container>
          <Footer />
        </>
      );
    } else {
      return (
        <>
          <Navbar />
          <Container>
            {resultScan.product.nutrition_grades ? (
              <Row>
                <Col>
                  <Image
                    className="mx-auto d-block"
                    alt="nutriscore"
                    src={getNutriScore(resultScan.product.nutrition_grades)}
                    id="result_grade"
                  />
                </Col>
              </Row>
            ) : null}
            <Row>
              {resultScan.product.image_front_url ? (
                <Col xs={{ span: 4, offset: 1 }} md={{ span: 4, offset: 2 }}>
                  <Image
                    className="mt-3"
                    src={resultScan.product.image_front_url}
                    alt="result_product_photo"
                    id="result_product_photo"
                  />
                </Col>
              ) : null}
              {!resultScan.product.product_name ? (
                <h1>Produit non trouvé</h1>
              ) : (
                <Col>
                  <div className="result_title">
                    <h5>{resultScan.product.product_name} </h5>
                    <p>{resultScan.product.generic_name} </p>
                  </div>
                </Col>
              )}
            </Row>
            <Row>
              <DonutChart
                className="result_donut "
                height="300"
                width="400"
                colors={["red", "#07a995", "yellow"]}
                data={[
                  {
                    label: "Glucides",
                    value: this.state.resultScan.product.nutriments
                      .carbohydrates
                  },
                  {
                    label: "lipides",
                    value: this.state.resultScan.product.nutriments.fat_value
                  },
                  {
                    label: "protéines",
                    value: this.state.resultScan.product.nutriments.proteins
                  }
                ]}
              />
            </Row>
          </Container>
          <Footer />
        </>
      );
    }

    // return (
    //   <>
    //     <Navbar />
    //     <div className="row no-gutters card1">
    //       <div className="col-md-4">
    //         {this.state.resultScan ? (
    //           <img
    //             src={this.state.resultScan.product.image_front_url}
    //             className="card-img img-responsive img2"
    //             alt="..."
    //           />
    //         ) : null}
    //       </div>

    //       <div className="">
    //         <div className="card-body productPic">
    //           {!this.state.resultScan ? (
    //             <div>Chargement des données en cours</div>
    //           ) : !this.state.resultScan.product.product_name ? (
    //             <div>
    //               <p>Produit non trouvé</p>
    //             </div>
    //           ) : (
    //             <>
    //               <div className="genericName">
    //                 <h5>
    //                   {this.state.resultScan.product.generic_name}
    //                   <br />
    //                   <small>
    //                     {this.state.resultScan.product.product_name}
    //                   </small>
    //                 </h5>
    //               </div>

    //               <p className="card-text">
    //                 Calories :
    //                 {this.state.resultScan.product.nutriments.fat_value === ""
    //                   ? "Non définie"
    //                   : Math.floor(
    //                       this.state.resultScan.product.nutriments.fat_value * 9
    //                     )}
    //                 Kcal
    //               </p>
    //               <DonutChart
    //                 className="donut"
    //                 height="300"
    //                 width="400"
    //                 colors={["red", "#07a995", "yellow"]}
    //                 data={[
    //                   {
    //                     label: "Glucides",
    //                     value: this.state.resultScan.product.nutriments
    //                       .carbohydrates
    //                   },
    //                   {
    //                     label: "lipides",
    //                     value: this.state.resultScan.product.nutriments
    //                       .fat_value
    //                   },
    //                   {
    //                     label: "protéines",
    //                     value: this.state.resultScan.product.nutriments.proteins
    //                   }
    //                 ]}
    //               />
    //             </>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   </>
    // );
  }
}

export default Result;
