const mongoose = require('mongoose');
const Joi = require('joi');

const orderSchema = new mongoose.Schema({
    product  : {
        type : mongoose.Schema.Types.ObjectId,
    },
    customer : {
        type : mongoose.Schema.Types.ObjectId,
        },
    quantity : Number,
    unit : String,
    rate : Number,
    discount: Number,
    finalRate : Number,
    price : Number,
    orderRecievedDate : {
        type : Date,
        default : Date.now() - 24*60*60*1000,
    },
    orderDate :{
        type : Date,
        default : Date.now(),
    },
    dueDate : {
        type : Date,
        default : Date.now() + 30*24*60*60*1000,
    },
    paymentStatus : {
        type : String,
        enum : ['Pending', 'Partial', 'Complete', 'Defaulted']
    },
    payments : [{
        description : String,
        amount : Number,
        paymentDate : {
            type : Date,
            default : Date.now(),
        },
    }]
       
});

function validateOrder(order){
    const schema = {
        // name : Joi.string().min(5).max(50).required(),
        // email : Joi.string().min(5).max(255).required().email(),
        // password : Joi.string().min(8).max(1024).required()
    }
    return Joi.validate(user, schema);
}


exports.Order = mongoose.model('Order', orderSchema);
exports.validate = validateOrder