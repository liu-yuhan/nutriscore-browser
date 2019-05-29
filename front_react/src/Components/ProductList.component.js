import React, { Component } from "react";
import axios from "axios";
import getNutriScore from "../utils/getNutriScore";
import { Card } from "react-bootstrap";

export default class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_article: this.props.history.barcode,
      loading: false,
      info_Article: null
    };
  }

  componentDidMount() {
    this.setState({
      loading: true
    });
    axios
      .get(
        "https://fr.openfoodfacts.org/api/V0/produit/" +
          this.props.history.barcode +
          ".json"
      )
      .then(res => {
        this.setState({
          info_Article: res.data
        });
        console.log("response", res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <br />
        <Card style={{ width: "18rem" }}>
          {this.state.info_Article ? (
            <Card.Img
              //height="150px"
              variant="top"
              src={this.state.info_Article.product.image_front_small_url}
            />
          ) : null}{" "}
          <Card.Body>
            {this.state.info_Article ? (
              <Card.Title>{this.state.info_Article.product.brands}</Card.Title>
            ) : null}
            {this.state.info_Article ? (
              <Card.Text>
                {this.state.info_Article
                  ? this.state.info_Article.product.generic_name === ""
                    ? "Aucune description... :'("
                    : this.state.info_Article.product.generic_name
                  : null}
                <br />
                {this.state.info_Article ? (
                  <img
                    height="50px"
                    alt="nutriscore"
                    src={getNutriScore(
                      this.state.info_Article.product.nutrition_grades_tags[0]
                    )}
                  />
                ) : null}
              </Card.Text>
            ) : null}
          </Card.Body>
        </Card>
      </div>
    );
  }
}
