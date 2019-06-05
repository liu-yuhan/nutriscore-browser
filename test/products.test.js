var server = require("../server");
let chai = require("chai");
let chaiHttp = require("chai-http");
const should = require("should");
const Product = require("../models/Products");
const User = require("../models/Users");
let expect = require("chai").expect;
const getToken = require("./tokenRecup");

describe("Test Product", () => {
  it("should give data about scanned object", done => {
    chai
      .request(server)
      .post("/api/product/3168930009030")
      .set("x-auth-token", token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("_id");
        res.body.should.have.property("barcode");
        res.body.should.have.property("user");
        res.body.should.have.property("date");
        done();
      });
  });

  it("should give msg after rescan object", done => {
    chai
      .request(server)
      .post("/api/product/3168930009030")
      .set("x-auth-token", token)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.deep.equal({ msg: "Product update" });
        done();
      });
  });

  it("should get error from invalid token", done => {
    chai
      .request(server)
      .post("/api/product/3168930009030")
      .set("x-auth-token", "token")
      .end((err, res) => {
        res.should.have.status(401);
        expect(res.body).to.deep.equal({ msg: "Token is not valid" });
        done();
      });
  });

  it("should not delete because invalid token", done => {
    chai
      .request(server)
      .delete("/api/product/3168930009030")
      .set("x-auth-token", "token")
      .end((err, res) => {
        res.should.have.status(401);
        expect(res.body).to.deep.equal({ msg: "Token is not valid" });
        done();
      });
  });

  it("should not delete because product doesnt exist", done => {
    chai
      .request(server)
      .delete("/api/product/25")
      .set("x-auth-token", token)
      .end((err, res) => {
        res.should.have.status(404);
        expect(res.body).to.deep.equal({ msg: "Product not found" });
        done();
      });
  });

  it("should delete product from database", done => {
    chai
      .request(server)
      .delete("/api/product/3168930009030")
      .set("x-auth-token", token)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
