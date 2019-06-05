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
        <div>
          <Navbar />
          <div>
            <Container className="d-block d-lg-none">
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
          </div>
          <div>
            <Container className="d-none d-lg-block">
              {!resultScan.product.product_name ? (
                <div className="result_title text-center">
                  <h1>Produit non trouvé</h1>
                </div>
              ) : (
                <Row>
                  <Col>
                    <div className="result_title text-center">
                      <h5>{resultScan.product.product_name} </h5>
                      <p>{resultScan.product.generic_name} </p>
                    </div>
                  </Col>
                </Row>
              )}
              <Row>
                <Col>
                  {resultScan.product.image_front_url ? (
                    <Image
                      className="mt-3"
                      src={resultScan.product.image_front_url}
                      alt="result_product_photo"
                      id="result_product_photo"
                    />
                  ) : null}
                </Col>
                <Col>
                  {resultScan.product.nutrition_grades ? (
                    <Image
                      className="d-block"
                      alt="nutriscore"
                      src={getNutriScore(resultScan.product.nutrition_grades)}
                      id="result_grade"
                    />
                  ) : null}
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
                        value: this.state.resultScan.product.nutriments
                          .fat_value
                      },
                      {
                        label: "protéines",
                        value: this.state.resultScan.product.nutriments.proteins
                      }
                    ]}
                  />
                </Col>
              </Row>
            </Container>
          </div>
          <Footer />
        </div>
      );
    }
  }
}

export default Result;
