var server = require('../server');
let chai = require('chai');
let chaiHttp = require('chai-http');
const should=require('should')
const Product = require('../models/Products')
let expect = require('chai').expect

var token=null;

describe("Test Profile", () => {

    before(function(done) {
        //Log and get back Token from existing account
        chai.request(server)
        .post('/api/auth')
        .send({
            email: "oui@oui.fr",
            password: "ouioui"
        })
        .end(function(err, res) {           
            token = res.body.token;
            done();
        })
    })


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
 
describe("Test Product", () => {

    before(function(done){
        Product.deleteOne({$and: [{'barcode':'3168930009030'},{'user':"5ced79e895c46d0812021158"}]})
        .then(res=>{
            console.log('Cleared Test Product On Test account from DB')
            done()
        })
    })

    after(function(done){
        Product.deleteOne({$and: [{'barcode':'3168930009030'},{'user':"5ced79e895c46d0812021158"}]})
        .then(res=>{
            console.log('Cleared Test Product after')
            done()
        })
    })
    
    

    it("should give data about scanned object", (done) => {
        chai.request(server)
            .post('/api/product/3168930009030')
            .set(
                    "x-auth-token", token
            )
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('_id')
                res.body.should.have.property('barcode')
                res.body.should.have.property('user')
                res.body.should.have.property('date')
                done();
            });
    });

    it("should get error from invalid token", (done) => {
        chai.request(server)
            .post('/api/product/3168930009030')
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
