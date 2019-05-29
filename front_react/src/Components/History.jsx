import React, { Component } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'


export default class History extends Component {

    constructor(props){
        super(props)
        this.state={
            history:[],
        }
    }

    componentWillMount(){
        const token=localStorage.jwToken
        const decoded=jwt_decode(token)
        console.log(decoded.user.id)
        axios.get('http://localhost:5000/api/product/'+decoded.user.id)
        .then(res=>{
            console.log(res)
            this.setState({
                history:res.data
            })
            console.log(this.history)
        })
        .catch(err =>{
            console.log(err)
        })
    }

    render() {
        return (
            <div>
                    Hello
            </div>
        )
    }
}


/* const styles  */