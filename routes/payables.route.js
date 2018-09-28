const express = require('express');
const router = express.Router();
const passport = require('passport');



router.get('/', async(req, res)=>{
});

router.get('/:id', async(req, res)=>{
});

router.post('/', passport.authenticate('jwt', {session: false}), async(req, res)=>{
});

router.put('/:id', passport.authenticate('jwt', {session: false}), async(req, res)=>{
    
});

router.delete('/:id', passport.authenticate('jwt', {session: false}), async(req, res)=>{
    
});

module.exports = router;