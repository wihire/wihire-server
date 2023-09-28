const { successResponse } = require('../../lib/response');
const userValidation = require('../../validations/user');
const SkillService = require('../../services/skill');
const { isNumber } = require('../../lib/common');
const { getPaginationStatus } = require('../../lib/pagination');

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

  static getAll = async (req, res, next) => {
    try {
      let { page, limit } = req.query;

      if (!page || !isNumber(page)) page = 1;
      if (!limit || !isNumber(limit)) limit = 15;

      const filters = {
        ...req.query,
        page,
        limit,
      };

      const totalData = await SkillService.getAllCount(filters);
      const skills = await SkillService.getAll(filters);
      const pagination = getPaginationStatus(page, limit, totalData);

      res.status(200).json(
        successResponse({
          message: 'Get all skill successfully',
          data: {
            skills,
          },
          pagination,
        }),
      );
    } catch (error) {
      next(error);
    }
  };
}

module.exports = SkillController;
