const { successResponse } = require('../../lib/response');
const { getPaginationStatus } = require('../../lib/pagination');
const ApplicantService = require('../../services/applicant');
const { isNumber } = require('../../lib/common');

class JobController {
  static getApplicants = async (req, res, next) => {
    const { slug } = req.params;
    let { page, limit } = req.query;

    if (!page || !isNumber(page)) page = 1;
    if (!limit || !isNumber(limit)) limit = 15;

    try {
      const applicants = await ApplicantService.getApplicants({
        jobSlug: slug,
        page,
        limit,
      });
      const totalData = await ApplicantService.getApplicantTotal(slug);

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

module.exports = JobController;
