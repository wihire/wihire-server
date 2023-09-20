const Joi = require('joi');
const PLACE_METHOD = require('../../constants/pladeMethod');
const JOB_STATUS = require('../../constants/jobStatus');
const JOB_TYPE = require('../../constants/jobType');

exports.createJob = Joi.object({
  title: Joi.string().min(4).max(255).required(),
  minimalSalary: Joi.number().min(100_000),
  maximalSalary: Joi.number().min(100_000),
  province: Joi.string().required().required(),
  address: Joi.string().required().required(),
  placeMethod: Joi.string()
    .valid(...Object.values(PLACE_METHOD))
    .required(),
  jobType: Joi.string()
    .valid(...Object.values(JOB_TYPE))
    .required(),
  description: Joi.string(),
  minimumQualification: Joi.string(),
  benefits: Joi.string(),
  status: Joi.string()
    .valid(...Object.values(JOB_STATUS))
    .required(),
  categoryAttributes: Joi.array()
});
