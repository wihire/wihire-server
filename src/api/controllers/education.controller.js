const { successResponse } = require('../../lib/response');
const userValidation = require('../../validations/user');
const EducationService = require('../../services/education');

class EducationController {
  static getDetailEducation = async (req, res, next) => {
    try {
      const profile = req.user;

      const education = await EducationService.getDetailEducationUser({
        user: profile.user,
        educationId: req.params.educationId,
      });

      return res.status(200).json(
        successResponse({
          message: 'Success get detail education',
          data: {
            education,
          },
        }),
      );
    } catch (error) {
      next(error);
    }
  };

  static createEducation = async (req, res, next) => {
    try {
      const profile = req.user;

      userValidation.validateCreateEducationPayload(req.body);

      await EducationService.createEducationUser({
        user: profile.user,
        payload: req.body,
      });

      return res.status(201).json(
        successResponse({
          message: 'Success create education',
        }),
      );
    } catch (error) {
      next(error);
    }
  };

  static updateEducation = async (req, res, next) => {
    try {
      const profile = req.user;

      userValidation.validateUpdateEducationPayload(req.body);

      await EducationService.updateEducationUser({
        user: profile.user,
        educationId: req.params.educationId,
        payload: req.body,
      });

      return res.status(200).json(
        successResponse({
          message: 'Success update education',
        }),
      );
    } catch (error) {
      next(error);
    }
  };

  static deleteEducation = async (req, res, next) => {
    try {
      const profile = req.user;

      await EducationService.deleteEducationUser({
        user: profile.user,
        educationId: req.params.educationId,
      });

      return res.status(200).json(
        successResponse({
          message: 'Success delete education',
        }),
      );
    } catch (error) {
      next(error);
    }
  };
}

module.exports = EducationController;
