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
      if (result === null) {
        const newProduct = new Product({
          barcode: req.params.id,
          user: req.user.id,
          date: Date.now()
        });
        const product = newProduct.save(err => {
          if (err) console.log(err);
          else {
            res.json(newProduct);
          }
        });
      } else {
        const product = Product.findByIdAndUpdate(
          result._id,
          { date: Date.now() },
          { new: true }
        )
          .then(result => res.json({msg: 'Product update'}))
          .catch(err => console.log(err));
      }
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

<<<<<<< master
router.delete("/:barcode", auth, async (req, res) => {
=======
router.delete('/:barcode', auth, async (req, res) => {
router.post('/:id', auth, async (req, res) => {
>>>>>>> Modif test mocha
  try {
    const product = await Product.findOne({
      $and: [{ barcode: req.params.barcode }, { user: req.user.id }]
    });
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    await product.remove();

    res.json({ msg: "Product removed " });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.status(500).send("Server error");
  }
});

module.exports = router;
