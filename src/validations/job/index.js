const { VALIDATION_ERR } = require('../../constants/errorType');
const InvariantError = require('../../exceptions/InvariantError');

const { createJob } = require('./schema');

const jobValidation = {
  validateCreateJobPayload: (payload) => {
    const validationResult = createJob.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, {
        type: VALIDATION_ERR,
      });
    }
  },
};

module.exports = jobValidation;
