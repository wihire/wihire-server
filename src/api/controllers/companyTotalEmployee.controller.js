const { isNumber } = require('../../lib/common');
const { getPaginationStatus } = require('../../lib/pagination');
const { successResponse } = require('../../lib/response');
const TotalEmployeeService = require('../../services/totalEmployee');

class CompanyTotalEmployeeController {
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

      const totalData = await TotalEmployeeService.getAllCount(filters);
      const totalEmployees = await TotalEmployeeService.getAll(filters);
      const pagination = getPaginationStatus(page, limit, totalData);

      res.status(200).json(
        successResponse({
          message: 'Get all company total employee successfully',
          data: {
            totalEmployees,
          },
          pagination,
        }),
      );
    } catch (error) {
      next(error);
    }
  };
}

module.exports = CompanyTotalEmployeeController;
