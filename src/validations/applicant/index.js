const { VALIDATION_ERR } = require('../../constants/errorType');
const InvariantError = require('../../exceptions/InvariantError');

const { updateApplicant } = require('./schema');

const applicantValidation = {
  validateUpdateApplicantPayload: (payload) => {
    const validationResult = updateApplicant.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, {
        type: VALIDATION_ERR,
      });
    }
  },
};

module.exports = applicantValidation;
