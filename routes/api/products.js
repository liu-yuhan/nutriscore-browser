const express = require("express");
const router = express.Router();
const Product = require("../../models/Products");
const User = require("../../models/Users");
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
          .catch(err => console.log(err));
      }
      console.log(req.user.id);
    })
    .catch(error => console.log(error));
});

router.get("/:user_id", async (req, res) => {
  try {
    const user_id = await User.findById(req.params.user_id);
    const user_products = await Product.find({ user: user_id });
    if (user_products) {
      res.json(user_products);
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

router.post('/:id', auth, async (req, res) => {
  try {
    const newProduct = new Product({
      barcode: req.params.id,
      user: req.user.id
    });
    const product = await newProduct.save();

    res.json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
})



module.exports = router;
