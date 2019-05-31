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
          .catch(err => console.log("patate", err));
      }
      console.log(req.user.id);
    })
    .catch(error => console.log("carrotte", error));
});

router.get("/:user_id", async (req, res) => {
  try {
    const user_id = await User.findById(req.params.user_id);
    const user_products = await Product.find({ user: user_id });
    if (user_products) {
      res.json(user_products);
    }
  } catch (error) {
    res.status(500).json({ msg: "nique ta mère" });
  }
});

<<<<<<< HEAD
=======
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

router.post('/comments/:id',
[
   auth,
   [
     check('text', 'Need a comment !')
     .not()
     .isEmpty()
   ]
],

  async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      res.status(400).json({error: errors})
    };
    try{
    let user = await User.findOne({ email: email })
    let product = await Products.findById(req.params.id);

    const newComment = {
      text: req.body.text, 
      user: req.user.id
    };

    product.comments.unshift(newComment);
    await product.save()
    res.json({product, user});
  } catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
  };
  }
);

router.delete('/comments/delete/:id', auth, async (req, res) => {
  try{
  const comment = await Product.findById(req.params.id);

    if(comment.user.toString() !== req.user.id){
      return res.status(401).json({msg: 'Not authorize to delete this comment'})
    } 
    await comment.remove();
    res.json({msg: 'Comment deleted !'})

  } catch(err){
    res.status(400).json({err: error})
  }
})



>>>>>>> yuhan
module.exports = router;
