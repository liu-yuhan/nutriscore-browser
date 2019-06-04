import React, { Component } from "react";
import { Col, Row, Card, Container } from "react-bootstrap";
import Navbar from "../../Components/navbar";
import { connect } from "react-redux";
import { profile } from "../../redux/action";
import jwt_decode from "jwt-decode";
import axios from "axios";
import moment from "moment";
import MenuProfile from "../../Components/MenuProfile";
import Footer from "../../Components/tabBar";
import "../container_res_style.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      email: "",
      date: "",
      token: ""
    };
  }

  componentDidMount() {
    const getToken = localStorage.getItem("jwToken");

    if (!getToken) {
      this.props.history.push("/login");
    } else {
      const decodeToken = jwt_decode(getToken);
      this.setState({ id: decodeToken.user.id });
      axios
        .get("http://localhost:5000/api/profile", {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": getToken
          }
        })
        .then(response => {
          // console.log(response);
          this.setState({
            name: response.data.name,
            email: response.data.email,
            date: response.data.date
          });
        })
        .catch(error => {
          console.log(error);
        });
    }

    render() {
        console.log('Props : ', this.props);
        return(
            <div>
                <Navbar/>
                <Card border="light">
                    <MenuProfile data={this.state} history={this.props.history} />
                    <Card.Img variant="top" src="https://picsum.photos/300" />
                    <Card.Header>User's Profile

  render() {
    return (
      <div>
        <Navbar />
        <div id="profile_info_zone" className="d-none d-lg-block">
          <Container>
            <Row>
              <Col lg={4}>
                <Card.Img
                  id="profile_img"
                  variant="top"
                  src="https://picsum.photos/300"
                />
              </Col>
              <Col lg={4}>
                <Card border="light" id="profile_card">
                  <MenuProfile props={this.props} />
                  <Card.Header>User's Profile</Card.Header>
                  <Card.Body>
                    <Card.Title>Username : {this.state.name}</Card.Title>
                    <Card.Text>Email : {this.state.email}</Card.Text>
                    <Card.Text>
                      Created at :{" "}
                      {moment(this.state.date).format("MMMM Do YYYY")}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        <div id="profile_info_zone" className="d-block d-lg-none">
          <Container>
            <Row>
              <Col>
                <Card border="light" id="profile_card" className="mx-auto">
                  <MenuProfile props={this.props} />
                  <Card.Header>User's Profile</Card.Header>
                  <Card.Img
                    id="profile_img"
                    className="mx-auto"
                    variant="top"
                    src="https://picsum.photos/300"
                  />
                  <Card.Body className="text-center" id="profile_card_body">
                    <Card.Title>Username : {this.state.name}</Card.Title>
                    <Card.Text>Email : {this.state.email}</Card.Text>
                    <Card.Text>
                      Created at :{" "}
                      {moment(this.state.date).format("MMMM Do YYYY")}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Profile;