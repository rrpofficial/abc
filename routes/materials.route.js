const express = require('express');
const router = express.Router();
const passport = require('passport');

const { Material, validate } = require('../models/material.model');

router.get('/', async(req, res)=>{
    const materials = await Material
    .find()
    .sort({'name' : 1});
    res.send(materials);
});


router.get('/:id', async(req, res)=>{
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
    res.send(result);
});

router.put('/:id', passport.authenticate('jwt', {session: false}), async(req, res)=>{
    
});

router.delete('/:id', passport.authenticate('jwt', {session: false}), async(req, res)=>{
    
});

module.exports = router;