const Joi = require('joi');

const loginSchema = {
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(1).required(),
  }).required(),
};

module.exports = loginSchema;
