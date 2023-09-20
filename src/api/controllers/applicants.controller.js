const { successResponse } = require('../../lib/response');
const { getPaginationStatus } = require('../../lib/pagination');
const ApplicantsService = require('../../services/applicants');

class ApplicantsController {
  static allApplicantsController = async (req, res, next) => {
    const { slug } = req.params;
    const { page = 1, limit = 15 } = req.query;
    const offset = (page - 1) * limit;
    try {
      const applicants = await ApplicantsService.getApplicants(slug, +offset, +limit);
      const totalData = await ApplicantsService.getApplicantTotal(slug);
      const pagination = getPaginationStatus(page, limit, totalData);
      return res.status(200).json(
        successResponse({
          message: 'Retrieved user data successfully',
          data: {
            applicants,
          },
          pagination,
        }),
      );
    } catch (error) {
      next(error);
    }
  };
}

module.exports = ApplicantsController;
