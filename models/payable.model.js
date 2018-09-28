const mongoose = require('mongoose');
const Joi = require('joi');

const payableSchema = new mongoose.Schema({
    
});

function validateRecievable(recievable){
    const schema = {
        // name : Joi.string().min(5).max(50).required(),
        // email : Joi.string().min(5).max(255).required().email(),
        // password : Joi.string().min(8).max(1024).required()
    }
    return Joi.validate(user, schema);
}

exports.Payable = mongoose.model('Payable', payableSchema);
exports.validate = validatePayable