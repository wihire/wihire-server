const { isNumber } = require('../../lib/common');
const { getPaginationStatus } = require('../../lib/pagination');
const { successResponse } = require('../../lib/response');
const CategoryService = require('../../services/category');

class CategoryController {
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

      const totalData = await CategoryService.getAllCount(filters);
      const categories = await CategoryService.getAll(filters);
      const pagination = getPaginationStatus(page, limit, totalData);

      res.status(200).json(
        successResponse({
          message: 'Get all categories successfully',
          data: {
            categories,
          },
          pagination,
        }),
      );
    } catch (error) {
      next(error);
    }
  };
}

module.exports = CategoryController;
