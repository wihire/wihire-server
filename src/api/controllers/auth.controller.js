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

  static registerUser = async (req, res, next) => {
    try {
      authValidation.validateRegisterPayload(req.body);

      const profile = await AuthService.registerUser(req.body);

      return res.status(201).json(
        successResponse({
          message: 'Success create user',
          data: {
            id: profile.id,
            slug: profile.slug,
          },
        }),
      );
    } catch (error) {
      next(error);
    }
  };
}

module.exports = AuthController;
