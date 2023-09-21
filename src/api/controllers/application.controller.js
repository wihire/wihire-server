const { successResponse } = require('../../lib/response');
const ApplicationService = require('../../services/application');
const { isNumber } = require('../../lib/common');
const { getPaginationStatus } = require('../../lib/pagination');

class ApplicationController {
  static getApplicationController = async (req, res, next) => {
    let { status, page, limit } = req.query;

    if (!page || !isNumber(page)) page = 1;
    if (!limit || !isNumber(limit)) limit = 15;

    try {
      const applications = await ApplicationService.getUserAppliation(status, +page, +limit);
      const totalData = await ApplicationService.getApplicationTotal(status);
      const pagination = getPaginationStatus(page, limit, totalData);
      return res.status(200).json(
        successResponse({
          message: 'User application retrieved',
          data: applications,
          pagination,
        }),
      );
    } catch (error) {
      next(error);
    }
  };
}

module.exports = ApplicationController;
