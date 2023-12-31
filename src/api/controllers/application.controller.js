const { successResponse } = require('../../lib/response');
const ApplicationService = require('../../services/application');
const { isNumber } = require('../../lib/common');
const { getPaginationStatus } = require('../../lib/pagination');
const STATUS_APPLICATION = require('../../constants/statusApplication');
const InvariantError = require('../../exceptions/InvariantError');
const { VALIDATION_ERR } = require('../../constants/errorType');

class ApplicationController {
  static getApplicationUser = async (req, res, next) => {
    try {
      let { status, page, limit } = req.query;
      const { user } = req.user;

      if (!page || !isNumber(page)) page = 1;
      if (!limit || !isNumber(limit)) limit = 15;

      if (status) {
        const statusValues = Object.values(STATUS_APPLICATION);
        if (!statusValues.includes(status)) {
          throw new InvariantError(`Status is not valid (${statusValues.join(', ')})`, {
            type: VALIDATION_ERR,
          });
        }
      }

      const applications = await ApplicationService.getUserApplication({
        userId: user.id,
        applicationStatus: status,
        page: +page,
        limit: +limit,
      });
      const totalData = await ApplicationService.getApplicationTotal({
        userId: user.id,
        applicationStatus: status,
      });
      const pagination = getPaginationStatus(page, limit, totalData);

      return res.status(200).json(
        successResponse({
          message: 'User application retrieved',
          data: {
            jobs: applications,
          },
          pagination,
        }),
      );
    } catch (error) {
      next(error);
    }
  };

  static checkApplication = async (req, res, next) => {
    try {
      const { user } = req.user;
      const { jobSlug } = req.params;

      const application = await ApplicationService.checkApplication({
        userId: user.id,
        jobSlug,
      });

      return res.status(200).json(
        successResponse({
          message: 'Application checked',
          data: {
            application,
          },
        }),
      );
    } catch (error) {
      next(error);
    }
  };
}

module.exports = ApplicationController;
