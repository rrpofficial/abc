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
    const vendor = await Vendor
    .findById(req.params.id)
    .sort({'name' : 1});
    // console.log(vendor);
    res.send(vendor);
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
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const result = await Vendor.findOneAndUpdate({_id :req.params.id}, {
        name : req.body.name,
        email : req.body.email,
        gstin : req.body.gstin,
        primaryPhone : req.body.primaryPhone,
        secondaryPhone : req.body.secondaryPhone,
        primaryAddress : {
          addressline1 : req.body.primaryAddress.addressline1,
          addressline2 : req.body.primaryAddress.addressline2,
          city : req.body.primaryAddress.city,
          pincode : req.body.primaryAddress.pincode,
          state : req.body.primaryAddress.state,
          country : req.body.primaryAddress.country,
        },
        alternateAddress : {
          addressline1 : req.body.alternateAddress.addressline1,
          addressline2 : req.body.alternateAddress.addressline2,
          city : req.body.alternateAddress.city,
          pincode : req.body.alternateAddress.pincode,
          state : req.body.alternateAddress.state,
          country : req.body.alternateAddress.country
        }
    }, { new : true});
    res.send(result);
});

router.delete('/:id', passport.authenticate('jwt', {session: false}), async(req, res)=>{
    
});

module.exports = router;