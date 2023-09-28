const { VALIDATION_ERR } = require('../../constants/errorType');
const InvariantError = require('../../exceptions/InvariantError');

const {
  updateProfileCompany,
  updateBasicProfileUser,
  updateSalaryExpectationProfileUser,
  updateResumeProfileUser,
  updateBasicProfileCompany,
} = require('./schema');

const profileValidation = {
  validateUpdateProfileCompanyPayload: (payload) => {
    const validationResult = updateProfileCompany.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, {
        type: VALIDATION_ERR,
      });
    }
  },
  validateUpdateBasicProfileUserPayload: (payload) => {
    const validationResult = updateBasicProfileUser.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, {
        type: VALIDATION_ERR,
      });
    }
  },
  validateUpdateSalaryExpectationProfileUserPayload: (payload) => {
    const validationResult = updateSalaryExpectationProfileUser.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, {
        type: VALIDATION_ERR,
      });
    }
  },
  validateUpdateResumeProfileUserPayload: (payload) => {
    const validationResult = updateResumeProfileUser.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, {
        type: VALIDATION_ERR,
      });
    }
  },
  validateUpdateBasicProfileCompanyPayload: (payload) => {
    const validationResult = updateBasicProfileCompany.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, {
        type: VALIDATION_ERR,
      });
    }
  },
};

module.exports = profileValidation;
