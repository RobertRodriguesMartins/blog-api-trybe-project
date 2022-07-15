const Joi = require('joi');

const required = 'Some required fields are missing';

const postSchema = {
  createPost: Joi.object({
    title: Joi.string().min(1).required().messages({
      'any.required': required,
      'string.empty': required,
    }),
    content: Joi.string().min(1).required().messages({
      'any.required': required,
      'string.empty': required,
    }),
    categoryIds: Joi.array().has(Joi.number().positive()).required(),
  }).required(),
};

module.exports = postSchema;
