const { User, validate } = require('../models/user.model');
const express = require('express');
const router = express.Router();

const _ = require('lodash');

const { getEncryptedPwd }  = require('../middleware/crypto');

router.get('/', async (req, res)=>{
   const users = await User
    .find()
    .select({'_id' : 1, 'name' : 1, 'email' : 1})
    .sort({name : 1});
    console.log(users);
    res.send(users)
});

router.post('/', async (req, res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({'email' : req.body.email});
    if(user) return res.status(400).send('An account already exists with this email id');

    user = new User({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    });

    user.password = await getEncryptedPwd(req.body.password);
    result = await user.save();
    res.send(_.pick(result, ['_id', 'name', 'email']));
    
     
});

module.exports = router;
