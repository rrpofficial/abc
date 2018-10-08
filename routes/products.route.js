const express = require('express');
const router = express.Router();
const passport = require('passport');

const { Product, validate } = require('../models/product.model');

router.get('/', async(req, res)=>{
    const products = await Product
    .find()
    .sort({'name' : 1});
    res.send(products);
});


router.get('/:id', async(req, res)=>{
});

router.post('/', passport.authenticate('jwt', {session: false}), async(req, res)=>{
    const { error } = validate(req.body);
    if(error) return res.status(400).send({'sucess': false, 'message': error.details[0].message});
    let product = await Product.findOne({ name : req.body.name});
    if(product) return res.status(400).send({'sucess': false, 'message' : 'Product with this name already exists'});
    product = new Product({
        name : req.body.name,
        rate : req.body.rate,
        unit : req.body.unit
    });
    const result = await product.save();
    res.send({'success': true, 'response' : result});
});

router.put('/:id', passport.authenticate('jwt', {session: false}), async(req, res)=>{
    
});

router.delete('/:id', passport.authenticate('jwt', {session: false}), async(req, res)=>{
    
});

module.exports = router;