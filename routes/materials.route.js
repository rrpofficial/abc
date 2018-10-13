const express = require('express');
const router = express.Router();
const passport = require('passport');

const { Material, validate } = require('../models/material.model');

router.get('/', passport.authenticate('jwt', {session: false}), async(req, res)=>{
    const materials = await Material
    .find()
    .sort({'name' : 1});
    res.send(materials);
});


router.get('/:id', passport.authenticate('jwt', {session: false}), async(req, res)=>{
    const material = await Material.findById(req.params.id);
    if(material) {
        res.send({'success' : true, data : material});
    }else{
        res.send({'success': false});
    }
});

router.post('/', passport.authenticate('jwt', {session: false}), async(req, res)=>{
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let material = await Material.findOne({ name : req.body.name});
    if(material) return res.status(400).send({ message : 'Material with this name already exists'});
    material = new Material({
        name : req.body.name,
        rate : req.body.rate,
        unit : req.body.unit
    });
    const result = await material.save();
    res.send({'success' : true, data : result});
});

router.put('/:id', passport.authenticate('jwt', {session: false}), async(req, res)=>{
    console.log('inside material route ', req.body);
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let material = await Material.findByIdAndUpdate(req.params.id, {name : req.body.name, rate : req.body.rate, unit : req.body.unit});
    // if(material) return res.status(400).send({ message : 'Material with this name already exists'});
    // material = new Material({
    //     name : req.body.name,
    //     rate : req.body.rate,
    //     unit : req.body.unit
    // });
    // const result = await material.save();
    
    res.send({'success' : true, 'response' : material});
});

router.delete('/:id', passport.authenticate('jwt', {session: false}), async(req, res)=>{
    let result = await Material.findByIdAndRemove(req.params.id);
    if(result){
        res.send({'success': true, 'response' : result});
    }else{
        res.send({'success': fail, 'msg':'Could not Delete', 'response' : result});
    }

});

module.exports = router;