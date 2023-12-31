const { successResponse } = require('../../lib/response');
const AuthService = require('../../services/auth');
const authValidation = require('../../validations/auth');

class AuthController {
  static login = async (req, res, next) => {
    try {
      authValidation.validateLoginPayload(req.body);

      const { accessToken, profile } = await AuthService.login(req.body);

      return res.status(200).json(
        successResponse({
          message: 'Login success',
          data: {
            accessToken: profile.isVerifiedEmail ? accessToken : null,
            profile,
          },
        }),
      );
    } catch (error) {
      next(error);
    }
  };

  static registerUser = async (req, res, next) => {
    try {
      authValidation.validateRegisterUserPayload(req.body);

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

  static registerCompany = async (req, res, next) => {
    try {
      authValidation.validateRegisterCompanyPayload(req.body);

      const pofile = await AuthService.registerCompany(req.body);

      return res.status(201).json(
        successResponse({
          message: 'Success create company',
          data: {
            id: pofile.id,
            slug: pofile.slug,
          },
        }),
      );
    } catch (error) {
      next(error);
    }
  };

  static forgotPassword = async (req, res, next) => {
    try {
      authValidation.validateForgotPasswordPayload(req.body);

      await AuthService.forgotPassword(req.body);

      return res.status(200).json(
        successResponse({
          message: 'Success send email forgot password',
        }),
      );
    } catch (error) {
      next(error);
    }
  };

  static verificationEmail = async (req, res, next) => {
    try {
      authValidation.validateVerificationEmailPayload(req.body);

      await AuthService.verificationEmail(req.body);

      return res.status(200).json(
        successResponse({
          message: 'Success send email verification',
        }),
      );
    } catch (error) {
      next(error);
    }
  };

  static forgotChangePassword = async (req, res, next) => {
    try {
      authValidation.validateForgotChangePasswordPayload(req.body);

      await AuthService.forgotChangePassword(req.body);

      return res.status(200).json(
        successResponse({
          message: 'Success change password',
        }),
      );
    } catch (error) {
      next(error);
    }
  };

  static verifyEmail = async (req, res, next) => {
    try {
      authValidation.validateVerifyEmailPayload(req.body);

      const { accessToken, profile } = await AuthService.verifyEmail(req.body);

      return res.status(200).json(
        successResponse({
          message: 'Your email is verified',
          data: {
            accessToken,
            profile,
          },
        }),
      );
    } catch (error) {
      next(error);
    }
  };
}

module.exports = AuthController;
