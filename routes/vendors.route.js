const express = require('express');
const router = express.Router();
const passport = require('passport');
const { Vendor , validate } = require ('../models/vendor.model');

router.get('/', async (req, res)=> {
    const vendors = await Vendor
    .find()
    .sort({'name' : 1});
    console.log(vendors);
    res.send(vendors);
});

router.get('/:id', async(req, res)=>{
});

// router.post('/', passport.authenticate('jwt', {session: false}), async(req, res)=>{
 router.post('/', async(req, res)=>{

    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let vendor = await Vendor.findOne({ name : req.body.name});
    if(vendor) return res.status(400).send({ message : 'Vendor with this name already exists'});
    vendor = new Vendor({
        name : req.body.name,
        primaryAddress : req.body.primaryAddress,
        alternateAddress : req.body.alternateAddress,
        primaryPhone : req.body.primaryPhone,
        alternatePhone : req.body.alternatePhone,
        gstin : req.body.gstin,
        email : req.body.email
    });
    const result = await vendor.save();
    res.send(result);
});

router.put('/:id', passport.authenticate('jwt', {session: false}), async(req, res)=>{
    
});

router.delete('/:id', passport.authenticate('jwt', {session: false}), async(req, res)=>{
    
});


module.exports = router;