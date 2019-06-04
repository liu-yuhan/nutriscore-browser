process.env.NODE_ENV = 'test';

var server = require('../server');
let chai = require('chai');
let chaiHttp = require('chai-http');
const User = require('../models/Users');

chai.use(chaiHttp);
chai.should();

describe("Test Users", () => {

    before(function(done) {
        //Clean db before
        User.deleteOne({"email": "test@test.com"})
            .then(res => {
                console.log('MongoDB cleaned before starting the tests.')
                done();
            });
        })

    after(function(done) {
        //Clean db after tests
        User.deleteOne({"email": "test@test.com"})
            .then(res => {
                console.log('MongoDB cleaned before ending the tests.')
                done();
            });
        })

    it("should register a user", (done) => {
        chai.request(server)
            .post('/api/users')
            .send({
            name: "Testeur",
            email: "test@test.com",
            password: "test12"
            })
            .end((err, res) => {
                res.should.have.status(200);
                //res.body.should.be.a('object');
                done();
            });
    });

    it("should say account already exist", (done) => {
        chai.request(server)
            .post('/api/users')
            .send({
            name: "Testeur",
            email: "test@test.com",
            password: "test12"
            })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it("should login a user", (done) => {
    chai.request(server)
        .post('/api/auth')
        .send({
            email: "test@test.com",
            password: "test12"
        })

        .end((err, res) => {
            res.should.have.status(200);
            //res.body.should.be.a('object');
            done();
            });
    });

    it("should not log user because email doesn't exist", (done) => {
        chai.request(server)
            .post('/api/auth')
            .send({
                email: "nexistepas@test.com",
                password: "test12"
            })
    
            .end((err, res) => {
                res.should.have.status(400);
                //res.body.should.be.a('object');
                done();
            });
    });

    it("should not log user cause password is wrong", (done) => {
        chai.request(server)
            .post('/api/auth')
            .send({
                email: "test@test.com",
                password: "test123"
            })
    
            .end((err, res) => {
                res.should.have.status(400);
                //res.body.should.be.a('object');
                done();
                });
    });

});