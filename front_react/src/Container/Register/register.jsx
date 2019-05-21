import React, {Component} from 'react';
import { Container , Form, Col, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import {Row} from 'react-bootstrap'
import { Header } from "../../Composer/header";
import "../container_style.css"

export default class Register extends Component{
    constructor(props){
        super(props)
        this.state={
            name : '',
            email : '',
            password : '',
            password_confirm : '',
        }
    }

    render() {
        const header = Header()

        return(
            <div>
                <div> {header} </div>
                <div className='container mx-auto register_form' >
                    <Form className="container my-3 d-block">
                        <Form.Group controlId="form_register_name">           
                            <Form.Control
                                name="name"
                                type="text"
                                placeholder="Username : "
                            />
                        </Form.Group>
                        <Form.Group controlId="form_register_email">
                            <Form.Control
                                name="email"
                                type="email"
                                placeholder="Email : "
                            />
                        </Form.Group >
                        <Form.Group  controlId="form_register_psw">
                            <Form.Control
                                name="password"
                                type="password"
                                placeholder="Password :"
                            />
                        </Form.Group>
                        <Form.Group  >
                            <Form.Control
                                name="pwd_conf"
                                type="password"
                                placeholder="Password Confirmation :"
                            />
                        </Form.Group>
                        <Button className="btn-block" >REGISTER</Button>
                        </Form>
                </div>
            </div>
        )}  
}