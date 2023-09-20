const { VALIDATION_ERR } = require('../../constants/errorType');
const InvariantError = require('../../exceptions/InvariantError');

const {
  login,
  register,
  registerCompany,
  forgotPassword,
  forgotChangePassword,
} = require('./schema');

const authValidation = {
  validateLoginPayload: (payload) => {
    const validationResult = login.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, {
        type: VALIDATION_ERR,
      });
    }
  },
  validateRegisterUserPayload: (payload) => {
    const validationResult = register.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, {
        type: VALIDATION_ERR,
      });
    }
  },
  validateRegisterCompanyPayload: (payload) => {
    const validationResult = registerCompany.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, {
        type: VALIDATION_ERR,
      });
    }
  },
  validateForgotPasswordPayload: (payload) => {
    const validationResult = forgotPassword.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, {
        type: VALIDATION_ERR,
      });
    }
  },
  validateForgotChangePasswordPayload: (payload) => {
    const validationResult = forgotChangePassword.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, {
        type: VALIDATION_ERR,
      });
    }
  },
};

module.exports = authValidation;
