const mongoose = require('mongoose');
const Joi = require('joi');

const orderSchema = new mongoose.Schema({
        customer : String,
        product : String,
        quantity : Number,
        rate : Number,
        discount : Number,
        price : Number,
        recievedDate : Date,
        dispatchDate : Date,
        dateDelivered : Date,
        dueDate : Date,
        paymentStatus : String
       
});

function validateRecievable(recievable){
    const schema = {
        // name : Joi.string().min(5).max(50).required(),
        // email : Joi.string().min(5).max(255).required().email(),
        // password : Joi.string().min(8).max(1024).required()
    }
    return Joi.validate(user, schema);
}


exports.Order = mongoose.model('Order', orderSchema);
exports.validate = validateOrder