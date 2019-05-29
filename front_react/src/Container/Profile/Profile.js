import React, { Component } from "react";
import { Button, Card } from "react-bootstrap";
// import { Redirect } from "react-router-dom";
import Header from "../../Components/header";
import "../container_style.css";
import { connect } from "react-redux";
import { profile } from "../../redux/action";
import jwt_decode from "jwt-decode";
import axios from "axios";
import moment from 'moment';




class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            name: '',
            email: '',
            date:'',

        }
    }

    componentDidMount() {
        const getToken = localStorage.getItem("jwToken");

        if (!getToken){
            this.props.history.push("/login")
        }
        else {
            const decodeToken = jwt_decode(getToken);
            this.setState({id: decodeToken.user.id});
            axios.get(
                "http://localhost:5000/api/profile",
                {
                    headers : {
                    'Content-Type': 'application/json',
                    'x-auth-token' : getToken
                    }})
                .then(response => {
                    // console.log(response);
                    this.setState({
                        name : response.data.name,
                        email: response.data.email,
                        date: response.data.date
                    })
                })
                .catch((error) => {
                    console.log(error);
                })

        }
    }


    render() {
        return(
            <div>
                <Header/>
                <Card border="light">
                    <Card.Img variant="top" src="https://picsum.photos/300" />
                    <Card.Header>User's Profile</Card.Header>
                    <Card.Body>
                        <Card.Title>Username : {this.state.name}</Card.Title>
                        <Card.Text>Email : {this.state.email}</Card.Text>
                        <Card.Text>Created at : {moment(this.state.date).format("MMMM Do YYYY")}</Card.Text>
                        <div className="d-flex justify-content-center mt-5">
                            <Button variant="primary mx-3">Edit</Button>
                            <Button variant="danger mx-3">Delete</Button>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        )
    }

}

export default connect(
    state => ({ user: state.user }),
    { profile }
)(Profile);