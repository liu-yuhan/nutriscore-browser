const express = require('express');
const router = express.Router();
const User = require('../../models/Users');
const Product = require('../../models/Products');
const auth = require('../middleware/auth');

router.put('/upvote/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (
      product.upvote.filter(upvotes => upvotes.user.toString() === req.user.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: 'Product already upvoted' });
    }
    product.upvote.unshift({ user: req.user.id });

    await product.save();

    res.json(product.upvote);
  } catch (error) {
    console.error(error.message);
    res.status(404).json({ msg: 'Product not found' });
  }
});

router.put('/downvote/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (
      product.downvote.filter(
        downvotes => downvotes.user.toString() === req.user.id
      ).length > 0
    ) {
      return res.status(400).json({ msg: 'Product already downvoted' });
    }
    const removeIndex = product.upvote
      .map(downvotes => downvotes.user.toString())
      .indexOf(req.user.id);

    product.upvote.splice(removeIndex, 1);
    product.downvote.unshift({ user: req.user.id });
    await product.save();

    res.json(product.downvote);
  } catch (error) {
    console.error(error.message);
    res.status(404).json({ msg: 'Product not found' });
  }
});

router.post('/:id', auth, async (req, res) => {
  try {
    const newProduct = new Product({
      barcode: req.body.barcode
    });
    const product = await newProduct.save();

    res.json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
