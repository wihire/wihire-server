const { successResponse } = require('../../lib/response');
const userValidation = require('../../validations/user');
const WorkExperienceService = require('../../services/workExperience');

class WorkExprienceController {
  static getDetailWorkExperience = async (req, res, next) => {
    try {
      const profile = req.user;

      const workExperience = await WorkExperienceService.getDetailWorkExperienceUser({
        user: profile.user,
        workExperienceId: req.params.workExperienceId,
      });

      return res.status(200).json(
        successResponse({
          message: 'Success get detail work experience',
          data: {
            workExperience,
          },
        }),
      );
    } catch (error) {
      next(error);
    }
  };

  static createWorkExperience = async (req, res, next) => {
    try {
      const profile = req.user;

      userValidation.validateCreateWorkExperiencePayload(req.body);

      await WorkExperienceService.createWorkExperienceUser({
        user: profile.user,
        payload: req.body,
      });

      return res.status(201).json(
        successResponse({
          message: 'Success create workExperience',
        }),
      );
    } catch (error) {
      next(error);
    }
  };

  static updateWorkExperience = async (req, res, next) => {
    try {
      const profile = req.user;

      userValidation.validateUpdateWorkExperiencePayload(req.body);

      await WorkExperienceService.updateWorkExperienceUser({
        user: profile.user,
        workExperienceId: req.params.workExperienceId,
        payload: req.body,
      });

      return res.status(200).json(
        successResponse({
          message: 'Success update workExperience',
        }),
      );
    } catch (error) {
      next(error);
    }
  };

  static deleteWorkExperience = async (req, res, next) => {
    try {
      const profile = req.user;

      await WorkExperienceService.deleteWorkExperienceUser({
        user: profile.user,
        workExperienceId: req.params.workExperienceId,
      });

      return res.status(200).json(
        successResponse({
          message: 'Success delete workExperience',
        }),
      );
    } catch (error) {
      next(error);
    }
  };
}

module.exports = WorkExprienceController;
