var server = require('../server');
let chai = require('chai');
let chaiHttp = require('chai-http');
const should=require('should')
const User = require('../models/Users')
let expect = require('chai').expect
const getToken=require('./tokenRecup')

before(getToken.getToken);

after(function(done){
    User.findOneAndDelete({email:'oui@oui.fr'})
    .then(res=>{
        done()
    })
})

describe("Test Profile", () => {



    it("should give user data", (done) => {
        chai.request(server)
            .get('/api/profile')
            .set(
                    "x-auth-token", token
                )
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('_id')
                res.body.should.have.property('name')
                res.body.should.have.property('email')
                res.body.should.have.property('date')
                done();
            });
    });

    it("should say token not valid ", (done) => {
        chai.request(server)
            .get('/api/profile')
            .set(
                    "x-auth-token", 'token'
                )
            .end((err, res) => {
                res.should.have.status(401);
                expect(res.body).to.deep.equal({msg:'Token is not valid'})
                done();
            });
    });


});
 
