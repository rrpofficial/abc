const express = require('express');
const router = express.Router();
const passport = require('passport');

const { Customer, validate } = require('../models/customer.model');

router.get('/', async(req, res)=>{
    const customers = await Customer
    .find()
    .sort({'name' : 1});
    res.send(customers);
});

router.get('/:id', async(req, res)=>{
});

router.post('/', passport.authenticate('jwt', {session: false}), async(req, res)=>{
// router.post('/',  async(req, res)=>{
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let customer = await Customer.findOne({ name : req.body.name});
    if(customer) return res.status(400).send({ message : 'Customer with this name already exists'});
    customer = new Customer({
        name : req.body.name,
        primaryAddress : req.body.primaryAddress,
        alternateAddress : req.body.alternateAddress,
        primaryPhone : req.body.primaryPhone,
        alternatePhone : req.body.alternatePhone,
        gstin : req.body.gstin,
        email : req.body.email
    });
    const result = await customer.save();
    res.send(result);

});

router.put('/:id', passport.authenticate('jwt', {session: false}), async(req, res)=>{
    
});

router.delete('/:id', passport.authenticate('jwt', {session: false}), async(req, res)=>{
    
});


module.exports = router;