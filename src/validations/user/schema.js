const Joi = require('joi');
const GENDER = require('../../constants/gender');
const SKILL_LEVEL = require('../../constants/skillLevel');

exports.updateBasic = Joi.object({
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

exports.updateSalaryExpectation = Joi.object({
  salaryExpectation: Joi.number().min(100_000),
});

exports.updateResume = Joi.object({
  deleteResume: Joi.boolean(),
});

exports.createEducation = Joi.object({
  name: Joi.string().max(255).required(),
  field: Joi.string().max(255).required(),
  grade: Joi.number(),
  maxGrade: Joi.number(),
  startDate: Joi.string().required(),
  endDate: Joi.string().required(),
});

exports.updateEducation = Joi.object({
  name: Joi.string().max(255).required(),
  field: Joi.string().max(255).required(),
  grade: Joi.number(),
  maxGrade: Joi.number(),
  startDate: Joi.string().required(),
  endDate: Joi.string().required(),
});

exports.createWorkExperience = Joi.object({
  companyName: Joi.string().max(255).required(),
  title: Joi.string().max(255).required(),
  startDate: Joi.string().required(),
  endDate: Joi.string(),
  description: Joi.string(),
});

exports.updateWorkExperience = Joi.object({
  companyName: Joi.string().max(255).required(),
  title: Joi.string().max(255).required(),
  startDate: Joi.string().required(),
  endDate: Joi.string(),
  description: Joi.string(),
});

exports.createProject = Joi.object({
  name: Joi.string().max(255).required(),
  role: Joi.string().max(255),
  url: Joi.string().uri(),
  description: Joi.string(),
  startDate: Joi.string().required(),
  endDate: Joi.string().required(),
});

exports.updateProject = Joi.object({
  name: Joi.string().max(255).required(),
  role: Joi.string().max(255),
  url: Joi.string().uri(),
  description: Joi.string(),
  startDate: Joi.string().required(),
  endDate: Joi.string().required(),
});

exports.createCertificate = Joi.object({
  name: Joi.string().max(255).required(),
  organization: Joi.string().max(255).required(),
  credentialUrl: Joi.string().uri(),
  credentialId: Joi.string().max(255).required(),
  issueDate: Joi.string(),
  expiredDate: Joi.string(),
});

exports.updateCertificate = Joi.object({
  name: Joi.string().max(255).required(),
  organization: Joi.string().max(255).required(),
  credentialUrl: Joi.string().uri(),
  credentialId: Joi.string().max(255).required(),
  issueDate: Joi.string(),
  expiredDate: Joi.string(),
});

exports.createSkill = Joi.object({
  skill: Joi.string().required(),
  level: Joi.string()
    .valid(...Object.values(SKILL_LEVEL))
    .required(),
});

exports.updateSkill = Joi.object({
  skill: Joi.string().required(),
  level: Joi.string()
    .valid(...Object.values(SKILL_LEVEL))
    .required(),
});
