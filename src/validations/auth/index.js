const { VALIDATION_ERR } = require('../../constants/errorType');
const InvariantError = require('../../exceptions/InvariantError');

const { login } = require('./schema');

const authValidation = {
  validateLoginPayload: (payload) => {
    const validationResult = login.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, {
        type: VALIDATION_ERR,
      });
    }
  },
};

module.exports = authValidation;
