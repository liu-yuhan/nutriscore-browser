import React, { Component } from 'react'
import Axios from 'axios';


class Result extends Component{
    
    constructor(props){
        super(props)
        this.state={
            idScan:'',
            resultScan:{},
        }
    }

    componentDidMount(){
        Axios.get('https://fr.openfoodfacts.org/api/V0/produit/'+this.props.match.params.id +'.json')
        .then(result=>{
            this.setState({resultScan:result.data})

            console.log(this.state.resultScan.product.generic_name_fr)
        })
    }

    render(){

        const loadCont=this.state.resultScan

        const loadFinish=(
            <div>
                Hello, you're on page {this.props.match.params.id}
                <br/>
                Le produit est du : {this.state.resultScan.product.generic_name_fr}
            </div>
        )

        const loading=(
            <div>
                Chargement des données en cours
            </div>
        )

        return(
            <div>
                {loadCont===[] ? loading : loadFinish}
            </div>
        )
    }
}

export default Result;