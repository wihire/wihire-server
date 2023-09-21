const Joi = require('joi');
const GENDER = require('../../constants/gender');

exports.login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

exports.register = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.string()
    .equal(Joi.ref('password'))
    .required()
    .label('confirmPassword')
    .options({ messages: { 'any.only': '{{#label}} does not match' } }),
  gender: Joi.string()
    .valid(...Object.values(GENDER))
    .required(),
  province: Joi.string().required(),
  address: Joi.string().required(),
  birthDate: Joi.string().required(),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]+$/)
    .required(),
  salaryExpectation: Joi.number().min(100_000).required(),
});

exports.registerCompany = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.string()
    .equal(Joi.ref('password'))
    .required()
    .label('confirmPassword')
    .options({ messages: { 'any.only': '{{#label}} does not match' } }),
  province: Joi.string().required(),
  address: Joi.string().required(),
  companyScope: Joi.string().required(),
  totalEmployee: Joi.string().required(),
});

exports.forgotPassword = Joi.object({
  email: Joi.string().email().required(),
});

exports.forgotChangePassword = Joi.object({
  token: Joi.string().required(),
  newPassword: Joi.string().min(8).required(),
  confirmNewPassword: Joi.string()
    .equal(Joi.ref('newPassword'))
    .required()
    .label('confirmPassword')
    .options({ messages: { 'any.only': '{{#label}} does not match' } }),

exports.verificationEmail = Joi.object({
  email: Joi.string().email().required(),
});

exports.verifyEmail = Joi.object({
  token: Joi.string().required(),

});
