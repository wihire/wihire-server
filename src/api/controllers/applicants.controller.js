const { successResponse } = require('../../lib/response');
const { getPaginationStatus } = require('../../lib/pagination');
const ApplicantsService = require('../../services/applicants');

class ApplicantsController {
  static allApplicantsController = async (req, res, next) => {
    const { slug } = req.params;
    const { page, limit } = req.query;
    const offset = (page - 1) * limit;
    try {
      const applicants = await ApplicantsService.getApplicants(slug, +offset, +limit);
      const totalData = applicants.applicationList.length;
      const pagination = getPaginationStatus(page, limit, totalData);
      return res.status(200).json(
        successResponse({
          message: 'Retrieved user data successfully',
          data: {
            ...applicants,
          },
          pagination,
        }),
      );
    } catch (error) {
      next(error);
    }
  };

  static rejectAllController = async (req, res, next) => {
    const { slug } = req.params;
    try {
      const rejected = await ApplicantsService.rejectAllApplicants(slug);
      return res.status(200).json(
        successResponse({
          messsage: 'Rejected all applicants',
          data: {
            ...rejected,
          },
        }),
      );
    } catch (error) {
      next(error);
    }
  };
}

module.exports = ApplicantsController;
