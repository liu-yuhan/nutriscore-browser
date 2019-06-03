import React, { Component } from "react";
import { Card } from "react-bootstrap";
import Header from "../../Components/header";
import jwt_decode from "jwt-decode";
import axios from "axios";
import moment from 'moment';
import MenuProfile from '../../Components/MenuProfile';
import Footer from "../../Components/tabBar";
import Navbar from "../../Components/navbar";

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

    componentWillMount() {
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
                });

        }
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

                    </Card.Header>
                    <Card.Body>
                        <Card.Title>Username : {this.state.name}</Card.Title>
                        <Card.Text>Email : {this.state.email}</Card.Text>
                        <Card.Text>Created at : {moment(this.state.date).format("MMMM Do YYYY")}</Card.Text>
                    </Card.Body>
                </Card>
                <Footer />
            </div>
        )
    }

}

export default Profile;