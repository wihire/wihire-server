const Joi = require('joi');
const GENDER = require('../../constants/gender');

exports.updateBasicProfileCompany = Joi.object({
  name: Joi.string().min(4).max(255).required(),
  email: Joi.string().email().required(),
  province: Joi.string().required(),
  address: Joi.string().required(),
  companyScope: Joi.string().required(),
  totalEmployee: Joi.string().required(),
  headline: Joi.string().max(255),
  about: Joi.string(),
  websiteLink: Joi.string().uri(),
  deleteAvatar: Joi.boolean(),
});

exports.updateBasicProfileUser = Joi.object({
  name: Joi.string().min(4).max(255).required(),
  email: Joi.string().email().required(),
  province: Joi.string().required(),
  address: Joi.string().required(),
  gender: Joi.string()
    .valid(...Object.values(GENDER))
    .required(),
  birthDate: Joi.string().required(),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]+$/)
    .required(),
  headline: Joi.string().max(255),
  about: Joi.string(),
  url: Joi.string().uri(),
  deleteAvatar: Joi.boolean(),
});

exports.updateSalaryExpectationProfileUser = Joi.object({
  salaryExpectation: Joi.number().min(100_000),
});

exports.updateResumeProfileUser = Joi.object({
  deleteResume: Joi.boolean(),
});
