const mongoose = require("mongoose");
const Joi = require("joi");

const vendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
    required: true,
    unique: true
  },
  primaryAddress: {
    addressline1: {
      type: String,
      minlenth: 10,
      maxlength: 50
    },
    addressline2: {
      type: String,
      minlenth: 10,
      maxlength: 50
    },
    city: String,
    pincode: String,
    state: String,
    country: String
  },
  alternateAddress: {
    addressline1: {
      type: String,
      minlenth: 10,
      maxlength: 50
    },
    addressline2: {
      type: String,
      minlenth: 5,
      maxlength: 50
    },
    city: String,
    pincode: String,
    state: String,
    country: String
  },
  primaryPhone: {
    type: String,
    minlength: 10,
    maxlength: 13
  },

  alternatePhone: {
    type: String,
    minlength: 10,
    maxlength: 13
  },

  gstin: {
    type: String,
    length: 15
  },
  email: {
    type: String,
    minlength: 8,
    maxlength: 255
  }
});

function validateVendor(vendor) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(100)
      .required(),
    primaryAddress: Joi.object().keys({
      addressline1: Joi.string()
        .min(10)
        .max(50),
      addressline2: Joi.string()
        .min(5)
        .max(50).allow('', null).optional(),
      city: Joi.string()
        .min(3)
        .max(50),
      pincode: Joi.string()
        .min(6)
        .max(6),
      state: Joi.string()
        .min(2)
        .max(50),
      country: Joi.string()
        .min(2)
        .max(50)
    }),
    alternateAddress: Joi.object().keys({
      addressline1: Joi.string()
        .min(10)
        .max(50).allow('', null).optional(),
      addressline2: Joi.string()
        .min(5)
        .max(50).allow('', null).optional(),
      city: Joi.string()
        .min(3)
        .max(50).allow('', null).optional(),
      pincode: Joi.string()
        .min(6)
        .max(6).allow('', null).optional(),
      state: Joi.string()
        .min(2)
        .max(50).allow('', null).optional(),
      country: Joi.string()
        .min(2)
        .max(50).allow('', null).optional(),
    }).allow('', null).optional(),
    email: Joi.string()
      .email().allow('', null).optional(),
    gstin: Joi.string()
      .min(15)
      .max(15).allow('', null).optional(),
    primaryPhone: Joi.string()
      .min(10)
      .max(13).allow('', null).optional(),
    alternatePhone: Joi.string()
      .min(10)
      .max(13).allow('', null).optional()
  };
  return Joi.validate(vendor, schema);
}

exports.Vendor = mongoose.model("Vendor", vendorSchema);
exports.validate = validateVendor;
