import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import Header from "../../Components/header";
import "../container_res_style.css";
import { connect } from "react-redux";
import { editprofile } from "../../redux/action";
import jwt_decode from "jwt-decode";
import { Redirect } from "react-router-dom";


class EditProfile extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            id: "",
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
    };
    submitHandler = event => {
        let psw = this.state.password;
        let psw_cfm = this.state.password_confirm;
        if (psw === psw_cfm) {
            this.props.editprofile(this.state);
        } else {
            console.log("" +
                "error");
        }
        return this.props.history.push('/login')
    };
    componentWillMount() {
        const getToken = localStorage.getItem("jwToken");
        if (getToken) {
            const decodeToken = jwt_decode(getToken);
            const currentTime = Date.now() / 1000;
            if (decodeToken.exp <= currentTime) {
                this.props.history.replace("/login");
            }
        }
        let user = this.props.location.data;
        if (user) {
            this.setState({
                id: user.id,
                name: user.name,
                email: user.email,
            })
        }

    }
    render() {
        const { msg } = this.props.user;
        let user = this.props.location.data;
        console.log('User : ', user);
        if (!user) {
            return <Redirect to="/profile" />;
        }

        return (
            <div>
                <Header />
                <div className="container mx-auto register_form">
                    {msg ? <h1>{msg}</h1> : null}
                    <Form className="container my-3 d-block">
                        <Form.Group controlId="form_register_name">
                            <Form.Control
                                name="name"
                                type="text"
                                value={this.state.name}
                                onChange={this.changeHandler.bind(this)}
                            />
                        </Form.Group>
                        <Form.Group controlId="form_register_email">
                            <Form.Control
                                name="email"
                                type="email"
                                value={this.state.email}
                                onChange={this.changeHandler.bind(this)}
                            />
                        </Form.Group>
                        {/*<Form.Group controlId="form_register_psw">*/}
                        {/*    <Form.Control*/}
                        {/*        name="password"*/}
                        {/*        type="password"*/}
                        {/*        placeholder="Password :"*/}
                        {/*        onChange={this.changeHandler.bind(this)}*/}
                        {/*    />*/}
                        {/*</Form.Group>*/}
                        {/*<Form.Group>*/}
                        {/*    <Form.Control*/}
                        {/*        name="password_confirm"*/}
                        {/*        type="password"*/}
                        {/*        placeholder="Password Confirmation :"*/}
                        {/*        onChange={this.changeHandler.bind(this)}*/}
                        {/*    />*/}
                        {/*</Form.Group>*/}
                        <Button
                            className="btn-block"
                            onClick={this.submitHandler.bind(this)}
                        >
                            UPDATE
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({user: state.user}),
    {editprofile}
)(EditProfile);