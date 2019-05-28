const express = require("express");
const router = express.Router();
const Product = require("../../models/Products");
const auth = require("../middleware/auth");

router.post("/:id", auth, (req, res) => {
  Product.findOne({
    $and: [{ barcode: req.params.id }, { user: req.user.id }]
  })
    .then(result => {
      console.log(result);
      if (result === null) {
        const newProduct = new Product({
          barcode: req.params.id,
          user: req.user.id,
          date: Date.now()
        });
        console.log(newProduct);
        const product = newProduct.save(err => {
          if (err) console.log(err);
          else {
            res.json(product);
          }
        });
      } else {
        const product = Product.findByIdAndUpdate(
          result._id,
          { date: Date.now() },
          { new: true }
        )
          .then(result => res.json(product))
          .catch(err => console.log("patate", err));
      }
      console.log(req.user.id);
    })
    .catch(error => console.log("carrotte", error));
});

module.exports = router;
