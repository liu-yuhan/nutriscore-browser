import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Navbar from "../../Components/navbar";
import Footer from "../../Components/tabBar";
import { connect } from "react-redux";
import { login } from "../../redux/action";
import jwt_decode from "jwt-decode";
import "../container_style.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      token: ""
    };
  }

  changeHandler = event => {
    let stateName = event.target.name;
    let newValue = event.target.value;
    this.setState({ [stateName]: newValue });
    // console.log(this.state);
  };

  submitHandler = event => {
    this.props.login(this.state);
  };

  toRegister = event => {
    this.props.history.replace("/register");
  };

  componentWillMount() {
    document.body.style.background = "#ffffff";
    const getToken = localStorage.getItem("jwToken");
    if (getToken) {
      const decodeToken = jwt_decode(getToken);
      const currentTime = Date.now() / 1000;
      if (decodeToken.exp >= currentTime) {
        this.props.history.replace("/profile");
      }
    }
  }
  render() {
    // console.log(this.props.user);
    const { msg, token } = this.props.user;
    if (token) {
      // console.log(token);
      return <Redirect to="/profile" />;
    }
    return (
      <div>
        <Navbar />
        <div className="container mx-auto register_form">
          {msg ? <h1> {msg}</h1> : null}
          <Form className="container my-3 d-block">
            <Form.Group controlId="form_register_email">
              <Form.Control
                name="email"
                type="email"
                placeholder="Email : "
                onChange={this.changeHandler.bind(this)}
              />
            </Form.Group>
            <Form.Group controlId="form_register_psw">
              <Form.Control
                name="password"
                type="password"
                placeholder="Password :"
                onChange={this.changeHandler.bind(this)}
              />
            </Form.Group>
            <Button
              className="btn-block"
              onClick={this.submitHandler.bind(this)}
            >
              LOGIN
            </Button>
            <Button className="btn-block" onClick={this.toRegister}>
              REGISTER
            </Button>
          </Form>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(
  state => ({ user: state.user }),
  { login }
)(Login);
