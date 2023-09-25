const { VALIDATION_ERR } = require('../../constants/errorType');
const InvariantError = require('../../exceptions/InvariantError');

const {
  updateBasic,
  updateSalaryExpectation,
  updateResume,
  createEducation,
  updateEducation,
  createWorkExperience,
  updateWorkExperience,
  createProject,
  updateProject,
  createCertificate,
  updateCertificate,
  createSkill,
  updateSkill,
} = require('./schema');

const userValidation = {
  validateUpdateBasicPayload: (payload) => {
    const validationResult = updateBasic.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, {
        type: VALIDATION_ERR,
      });
    }
  },
  validateUpdateSalaryExpectationPayload: (payload) => {
    const validationResult = updateSalaryExpectation.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, {
        type: VALIDATION_ERR,
      });
    }
  },
  validateUpdateResumePayload: (payload) => {
    const validationResult = updateResume.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, {
        type: VALIDATION_ERR,
      });
    }
  },
  validateCreateEducationPayload: (payload) => {
    const validationResult = createEducation.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, {
        type: VALIDATION_ERR,
      });
    }
  },
  validateUpdateEducationPayload: (payload) => {
    const validationResult = updateEducation.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, {
        type: VALIDATION_ERR,
      });
    }
  },
  validateCreateWorkExperiencePayload: (payload) => {
    const validationResult = createWorkExperience.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, {
        type: VALIDATION_ERR,
      });
    }
  },
  validateUpdateWorkExperiencePayload: (payload) => {
    const validationResult = updateWorkExperience.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, {
        type: VALIDATION_ERR,
      });
    }
  },
  validateCreateProjectPayload: (payload) => {
    const validationResult = createProject.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, {
        type: VALIDATION_ERR,
      });
    }
  },
  validateUpdateProjectPayload: (payload) => {
    const validationResult = updateProject.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, {
        type: VALIDATION_ERR,
      });
    }
  },
  validateCreateCertificatePayload: (payload) => {
    const validationResult = createCertificate.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, {
        type: VALIDATION_ERR,
      });
    }
  },
  validateUpdateCertificatePayload: (payload) => {
    const validationResult = updateCertificate.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, {
        type: VALIDATION_ERR,
      });
    }
  },
  validateCreateSkillPayload: (payload) => {
    const validationResult = createSkill.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, {
        type: VALIDATION_ERR,
      });
    }
  },
  validateUpdateSkillPayload: (payload) => {
    const validationResult = updateSkill.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, {
        type: VALIDATION_ERR,
      });
    }
  },
};

module.exports = userValidation;
