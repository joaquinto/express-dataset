const Joi = require("joi")

const joiValidator = (data, schema) => {
  let message;
  const validationOptions = {
    allowUnknown: true,
    stripUnknown: true,
    abortEarly: false
  };
  Joi.validate(data, schema, validationOptions, (error) => {
    if (error) {
      message = error.details.map(items => items.message.replace(/['"]/g, ''));
    }
  });
  return message;
};

module.exports = {
  joiValidator: joiValidator
}
