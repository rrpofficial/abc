const mongoose = require('mongoose');
const Joi = require('joi');

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        minlength : 3,
        maxlength : 50,
        required : true,
        unique : true
    },
    rate : {
        type : Number,
        min : 0,
        max : 99999
    },
    unit : {
        type : String,
        minlength : 1,
        maxlength : 50
    }
});

function validateProduct(product){
    const schema = {
        name : Joi.string().min(3).max(50).required(),
        rate : Joi.number().min(0).max(99999),
        unit : Joi.string().min(1).max(50)
        // email : Joi.string().min(5).max(255).required().email(),
        // password : Joi.string().min(8).max(1024).required()
    }
    return Joi.validate(product, schema);
}

exports.Product = mongoose.model('Product', productSchema);
exports.validate = validateProduct