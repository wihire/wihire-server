const { isNumber } = require('../../lib/common');
const { getPaginationStatus } = require('../../lib/pagination');
const { successResponse } = require('../../lib/response');
const CompanyScopeService = require('../../services/companyScope');

class CompanyScopeController {
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

      const totalData = await CompanyScopeService.getAllCount(filters);
      const companyScope = await CompanyScopeService.getAll(filters);
      const pagination = getPaginationStatus(page, limit, totalData);

      res.status(200).json(
        successResponse({
          message: 'Get all company scope successfully',
          data: {
            companyScope,
          },
          pagination,
        }),
      );
    } catch (error) {
      next(error);
    }
  };
}

module.exports = CompanyScopeController;
