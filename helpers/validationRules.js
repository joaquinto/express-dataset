const Joi = require("joi");

module.exports = {
  id: Joi.number().integer().required(),
  login: Joi.string().required().trim().min(3),
  avatar_url: Joi.string().required().trim(),
  type: Joi.string().required().trim(),
  name: Joi.string().required().trim(),
  url: Joi.string().required().trim(),
  created_at: Joi.date().required()
}
