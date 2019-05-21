const express = require('express');
const router = express.Router();
const auth = require('../../routes/middleware/auth');
const User = require('../../models/Users');
const Product = require('../../models/Products');
​
router.post('/upvote/:barcode', auth,async (req, res) => {
    Product.find(req.params.barcode, async(err, result) => {
        if(err){
            console.log('error')
            res.status(400).json({error: err})
        } else if(!result) 
            console.log('coucou2')
            const newProduct = new Product({
               barcode: req.params.barcode,
            });
            console.log("GHello")
           await  newProduct.save();
        
    })
})