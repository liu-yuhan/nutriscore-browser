import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Header from "../../Components/header";
import "../container_style.css";
import { register } from "../../redux/action";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password_confirm: "",
      token: ""
    };
  }
  changeHandler = event => {
    let stateName = event.target.name;
    let newValue = event.target.value;
    this.setState({ [stateName]: newValue });
    //console.log(this.state);
  };
  submitHandler = event => {
    var psw = this.state.password;
    var psw_cfm = this.state.password_confirm;
    if (psw === psw_cfm) {
      this.props.register(this.state);
    } else {
      console.log("guigui");
    }
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
    console.log(this.props.user);
    const { msg, token } = this.props.user;
    if (token) {
      return <Redirect to="/profile" />;
    }

    return (
      <div>
        <Header />
        <div className="container mx-auto register_form">
          {msg ? <h1> {msg}</h1> : null}
          <Form className="container my-3 d-block">
            <Form.Group controlId="form_register_name">
              <Form.Control
                name="name"
                type="text"
                placeholder="Username : "
                onChange={this.changeHandler.bind(this)}
              />
            </Form.Group>
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
            <Form.Group>
              <Form.Control
                name="password_confirm"
                type="password"
                placeholder="Password Confirmation :"
                onChange={this.changeHandler.bind(this)}
              />
            </Form.Group>
            <Button
              className="btn-block"
              onClick={this.submitHandler.bind(this)}
            >
              REGISTER
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({ user: state.user }),
  { register }
)(Register);
