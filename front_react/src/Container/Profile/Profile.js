import React, { Component } from "react";
import { Button, Card } from "react-bootstrap";
// import { Redirect } from "react-router-dom";
import Header from "../../Components/header";
import "../container_style.css";
import { connect } from "react-redux";
import { userProfile } from "../../redux/action";
import jwt_decode from "jwt-decode";



class Profile extends Component {
    constructor(props) {
        super(props);
        console.log(props);

        this.state = {
            token: '',
        }
    }

    componentDidMount() {
        let token = this.props.user.token;
        if (!token){
            this.props.history.replace("/login")
        }
        else {
            // const decodeToken = jwt_decode(token);
            console.log(token);
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
                        <Card.Title>Username</Card.Title>
                        <Card.Text>Email</Card.Text>
                        <Card.Text>Created at : </Card.Text>
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
    { userProfile }
)(Profile);