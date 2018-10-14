const mongoose = require('mongoose');
const Joi = require('joi');

const orderSchema = new mongoose.Schema({
        quantity : Number,
        discount : Number,
        finalRate : Number,
        price : Number,
        recievedDate : Date,
        dispatchedDate : Date,
        deliveredDate : Date,
        dueDate : Date,
        customer : {
            type :  mongoose.Schema.Types.ObjectId,
            ref : 'Customer'
          },
        product : {
              type :  mongoose.Schema.Types.ObjectId,
              ref : 'Product'
            },
        recievables : {
            type : mongoose.Schema.Types.ObjectId,
            ref = 'Recievable'
        }
       
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