const { VALIDATION_ERR } = require('../../constants/errorType');
const InvariantError = require('../../exceptions/InvariantError');

const { createJob, updateJob } = require('./schema');

const jobValidation = {
  validateCreateJobPayload: (payload) => {
    const validationResult = createJob.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, {
        type: VALIDATION_ERR,
      });
    }
  },

  validateUpdateJobPayload: (payload) => {
    const validationResult = updateJob.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, {
        type: VALIDATION_ERR,
      });
    }
  },
};

module.exports = jobValidation;
