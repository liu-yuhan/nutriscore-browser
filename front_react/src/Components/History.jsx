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

  componentDidMount() {
    const getToken = localStorage.getItem("jwToken");

    if (!getToken) {
      this.props.history.push("/login");
    } else {
      const decoded = jwt_decode(getToken);
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
  }

  historyList() {
    if (this.state.history.length > 0) {
      return this.state.history.map((currentHistory, i) => {
        return <ProductList history={currentHistory} key={i} />;
      });
    } else {
      return (
        <div
          className="badge badge-primary text-wrap font-weight-bolder"
          style={{ marginTop: 270, marginLeft: 110 }}
        >
          No product scan yet !
        </div>
      );
    }
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
