const Joi = require('joi');

exports.login = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
