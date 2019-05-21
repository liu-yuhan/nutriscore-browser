import React, {Component} from 'react';
import { Container , Form, Col, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import {Row} from 'react-bootstrap'
import  Header from "../../Composer/header";
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
    changeHandler=(event)=>{
        var stateName = event.target.name
        var newValue = event.target.value
        this.setState({[stateName] : newValue} )
        //console.log(this.state);  
    }
    submitHandler=(event)=>{
        var psw=this.state.password
        var psw_cfm=this.state.password_confirm
        if(psw===psw_cfm){
            console.log(this.state)
        }else{
            console.log("guigui")
        }
    }

    render() {   
        return(
            <div>
                <Header />
                <div className='container mx-auto register_form' >
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
                        </Form.Group >
                        <Form.Group  controlId="form_register_psw">
                            <Form.Control
                                name="password"
                                type="password"
                                placeholder="Password :"
                                onChange={this.changeHandler.bind(this)}
                            />
                        </Form.Group>
                        <Form.Group  >
                            <Form.Control
                                name="password_confirm"
                                type="password"
                                placeholder="Password Confirmation :"
                                onChange={this.changeHandler.bind(this)}
                            />
                        </Form.Group>
                        <Button className="btn-block" onClick={this.submitHandler.bind(this) } >REGISTER</Button>
                        </Form>
                </div>
            </div>
        )}  
}