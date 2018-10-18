const express = require('express');
const router = express.Router();
const passport = require('passport');

const {Order} = require('../models/order.model');

router.get('/', async(req, res)=>{
    const orders = await Order.find()
    .populate({ path: 'product', select: 'name' })
    .populate({path : 'customer', select: 'name'})
    .sort({orderDate : -1});

    res.send(orders);
});

router.get('/:id', async(req, res)=>{
    const order = await Order.findById(req.params.id)
    .populate({ path: 'product', select: 'name' })
    .populate({path : 'customer', select: 'name'});
    res.send(order);
});

// router.post('/', async(req, res)=>{

router.post('/', passport.authenticate('jwt', {session: false}), async(req, res)=>{
    const order = new Order({
        product : req.body.productId,
        customer : req.body.customerId,
        quantity : req.body.quantity,
        unit : req.body.unit,
        rate : req.body.rate,
        discount : req.body.discount,
        finalRate : req.body.finalRate,
        price : req.body.price,
        orderRecievedDate : req.body.orderRecievedDate,
        orderDate : req.body.orderDate,
        dueDate : req.body.dueDate,
        paymentStatus : req.body.paymentStatus,
        payments : req.body.payments,
    });
    console.log(JSON.stringify(req.body))
    const result = await order.save();
    res.send(result);
});

router.put('/:id', passport.authenticate('jwt', {session: false}), async(req, res)=>{
    const order = new Order({
        product : req.body.productId,
        customer : req.body.customerId,
        quantity : req.body.quantity,
        unit : req.body.unit,
        rate : req.body.rate,
        discount : req.body.discount,
        finalRate : req.body.finalRate,
        price : req.body.price,
        orderRecievedDate : req.body.orderRecievedDate,
        orderDate : req.body.orderDate,
        dueDate : req.body.dueDate,
        paymentStatus : req.body.paymentStatus,
        payments : req.body.payments,
    });
    
    const result = await Order.findOneAndUpdate({ _id : req.params.id}, order, {new : true});
    res.send(result);
});

router.delete('/:id', passport.authenticate('jwt', {session: false}), async(req, res)=>{
    
});

module.exports = router;