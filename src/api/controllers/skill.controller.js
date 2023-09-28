const { successResponse } = require('../../lib/response');
const userValidation = require('../../validations/user');
const SkillService = require('../../services/skill');

class SkillController {
  static getDetailSkill = async (req, res, next) => {
    try {
      const profile = req.user;

      const skill = await SkillService.getDetailSkillUser({
        user: profile.user,
        skillId: req.params.skillId,
      });

      return res.status(200).json(
        successResponse({
          message: 'Success get detail skill user',
          data: {
            skill,
          },
        }),
      );
    } catch (error) {
      next(error);
    }
  };

  static createSkill = async (req, res, next) => {
    try {
      const profile = req.user;

      userValidation.validateCreateSkillPayload(req.body);

      await SkillService.createSkillUser({
        user: profile.user,
        payload: req.body,
      });

      return res.status(201).json(
        successResponse({
          message: 'Success create skill',
        }),
      );
    } catch (error) {
      next(error);
    }
  };

  static updateSkill = async (req, res, next) => {
    try {
      const profile = req.user;

      userValidation.validateUpdateSkillPayload(req.body);

      await SkillService.updateSkillUser({
        user: profile.user,
        skillId: req.params.skillId,
        payload: req.body,
      });

      return res.status(200).json(
        successResponse({
          message: 'Success update skill',
        }),
      );
    } catch (error) {
      next(error);
    }
  };

  static deleteSkill = async (req, res, next) => {
    try {
      const profile = req.user;

      await SkillService.deleteSkillUser({
        user: profile.user,
        skillId: req.params.skillId,
      });

      return res.status(200).json(
        successResponse({
          message: 'Success delete skill',
        }),
      );
    } catch (error) {
      next(error);
    }
  };
}

module.exports = SkillController;
