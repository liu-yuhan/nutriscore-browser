import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import ProductList from "./ProductList.component";
import Navbar from "../Components/navbar";
import Footer from "../Components/tabBar";
import "./res_style.css";
import { Container } from "react-bootstrap";

export default class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: []
    };
  }

  componentWillMount() {
    const token = localStorage.jwToken;
    const decoded = jwt_decode(token);
    axios
      .get("http://localhost:5000/api/product/" + decoded.user.id)
      .then(res => {
        console.log(res.data);
        this.setState({
          history: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  historyList() {
    return this.state.history.map((currentHistory, i) => {
      return <ProductList history={currentHistory} key={i} />;
    });
  }

  render() {
    return (
      <>
        <Navbar />
        <Container className="history_list ">
          <div>{this.historyList()}</div>
        </Container>
        <Footer />
      </>
    );
  }
}

/* const styles  */
