const { successResponse } = require('../../lib/response');
const AuthService = require('../../services/auth');
const authValidation = require('../../validations/auth');

class AuthController {
  static login = async (req, res, next) => {
    try {
      authValidation.validateLoginPayload(req.body);

      const accessToken = await AuthService.login(req.body);

      return res.status(200).json(
        successResponse({
          message: 'Login success',
          data: {
            accessToken,
          },
        }),
      );
    } catch (error) {
      next(error);
    }
  };
}

module.exports = AuthController;
