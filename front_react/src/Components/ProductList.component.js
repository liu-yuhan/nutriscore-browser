import React, { Component } from "react";
import axios from 'axios'

export default class ProductList extends Component {
  constructor(props){
    super(props)
    this.setState({
      id_article:this.props.history._id,
      loading:false,
      info_Article:{}
    })
  }

  componentDidMount(){
    this.setState({
      loading:true
    })
    axios.get("https://fr.openfoodfacts.org/api/V0/produit/" +this.props.history._id + ".json")
    .then(res =>{
      console.log(res)
    })
    .catch(err =>{
      console.log(err)
    })
  }


  render() {
    return(
    <div >
      this.state.id_article}
    </div>
    );
  }
}
