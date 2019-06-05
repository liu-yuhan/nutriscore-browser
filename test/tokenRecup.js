var server = require('../server');
let chai = require('chai');
let chaiHttp = require('chai-http');
const User = require('../models/Users')

function getToken(){

    User.findOneAndDelete({email:'oui@oui.fr'})
    .then(res =>{
        console.log('Ouioui cleaned')
    })
    .catch(err=>{
        console.log(err)
    })

    return chai.request(server)
        .post('/api/users')
        .send({
        name: "Oui",
        email: "oui@oui.fr",
        password: "ouioui"
        })
        .then((res) => {
            token = res.body.token;
            return(token)
        });

}

module.exports={getToken: function(done) {
    getToken()
    .then(res=>{
        done();
    })
    .catch(err=>{
        console.log(err);
        done();
    })
}}