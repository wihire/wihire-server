const Joi = require('joi');
const STATUS_APPLICATION = require('../../constants/statusApplication');

exports.updateApplicant = Joi.object({
  status: Joi.string()
    .valid(...Object.values(STATUS_APPLICATION))
    .required(),
});
