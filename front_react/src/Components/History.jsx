import React, { Component } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import ProductList from './ProductList.component'


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
        axios.get('http://localhost:5000/api/product/'+decoded.user.id)
        .then(res=>{
            this.setState({
                history:res.data
            })
        })
        .catch(err =>{
            console.log(err)
        })
    }

    historyList(){    
        return this.state.history.map((currentHistory, i) => {
            return <ProductList history={currentHistory} key={i} />;
        });
    }

    render() {
        return (
            <div className='container'>
                <div className="jumbotron">
                    Hello
                    {this.historyList()}
                </div>
            </div>
        )
    }
}


/* const styles  */