const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true,
            minlength: 5,
            maxlength : 50
        },
        email : {
            type : String,
            required : true,
            minlength : 5,
            maxlength : 255,
            unique : true
        },
        password : {
            type : String,
            required : true,
            minlength: 8,
            maxlength : 1024,
        },
        isAdmin : {
            type : Boolean,
            default : false
        }
}
);

function validateUser(user){
    const schema = {
        name : Joi.string().min(5).max(50).required(),
        email : Joi.string().min(5).max(255).required().email(),
        password : Joi.string().min(8).max(1024).required(),
        isAdmin : Joi.boolean()
    }
    return Joi.validate(user, schema);
}
exports.User = mongoose.model('User', userSchema);
exports.validate = validateUser