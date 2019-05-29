import React, { Component } from "react";
import { Button, Card } from "react-bootstrap";
// import { Redirect } from "react-router-dom";
import Header from "../../Components/header";
import "../container_style.css";
import { connect } from "react-redux";
import { profile } from "../../redux/action";
import jwt_decode from "jwt-decode";

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
    const getToken = localStorage.getItem("jwToken");

    if (!getToken) {
      this.props.history.push("/login");
    } else {
      const decodeToken = jwt_decode(getToken);
      console.log(decodeToken.user.id);
      const userId = decodeToken.user.id;
      this.state.id = userId;
      this.state.token = getToken;
      console.log("State.id : ", this.state);
      this.props.profile(this.state);
    }
  }

  //   componentWillMount() {
  //     const getToken = localStorage.getItem("jwToken");

  //     if (!getToken) {
  //       this.props.history.push("/login");
  //     } else {
  //       const decodeToken = jwt_decode(getToken);
  //       console.log(decodeToken.user.id);
  //       const userId = decodeToken.user.id;
  //       this.setState({ id: userId });

  //       console.log("State.id : ", this.state);
  //       this.props.profile(this.state);
  //     }
  //   }

  render() {
    console.log(this.props);
    const { name } = this.props.user;
    return (
      <div>
        <Header />
        <Card border="light">
          <Card.Img variant="top" src="https://picsum.photos/300" />
          <Card.Header>User's Profile</Card.Header>
          <Card.Body>
            <Card.Title>Username: {name}</Card.Title>
            <Card.Text>Email</Card.Text>
            <Card.Text>Created at : </Card.Text>
            <div className="d-flex justify-content-center mt-5">
              <Button variant="primary mx-3">Edit</Button>
              <Button variant="danger mx-3">Delete</Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default connect(
  state => ({ user: state.user }),
  { profile }
)(Profile);
