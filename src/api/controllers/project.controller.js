const { successResponse } = require('../../lib/response');
const userValidation = require('../../validations/user');
const ProjectService = require('../../services/project');

class ProjectController {
  static getDetailProject = async (req, res, next) => {
    try {
      const profile = req.user;

      const project = await ProjectService.getDetailProjectUser({
        user: profile.user,
        projectId: req.params.projectId,
      });

      return res.status(200).json(
        successResponse({
          message: 'Success get detail project',
          data: {
            project,
          },
        }),
      );
    } catch (error) {
      next(error);
    }
  };

  static createProject = async (req, res, next) => {
    try {
      const profile = req.user;

      userValidation.validateCreateProjectPayload(req.body);

      await ProjectService.createProjectUser({
        user: profile.user,
        payload: req.body,
      });

      return res.status(201).json(
        successResponse({
          message: 'Success create project',
        }),
      );
    } catch (error) {
      next(error);
    }
  };

  static updateProject = async (req, res, next) => {
    try {
      const profile = req.user;

      userValidation.validateUpdateProjectPayload(req.body);

      await ProjectService.updateProjectUser({
        user: profile.user,
        projectId: req.params.projectId,
        payload: req.body,
      });

      return res.status(200).json(
        successResponse({
          message: 'Success update project',
        }),
      );
    } catch (error) {
      next(error);
    }
  };

  static deleteProject = async (req, res, next) => {
    try {
      const profile = req.user;

      await ProjectService.deleteProjectUser({
        user: profile.user,
        projectId: req.params.projectId,
      });

      return res.status(200).json(
        successResponse({
          message: 'Success delete project',
        }),
      );
    } catch (error) {
      next(error);
    }
  };
}

module.exports = ProjectController;
