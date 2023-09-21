const { successResponse } = require('../../lib/response');
const { getPaginationStatus } = require('../../lib/pagination');
const ApplicantService = require('../../services/applicant');
const { isNumber } = require('../../lib/common');
const JobService = require('../../services/job');
const jobValidation = require('../../validations/job');

class JobController {
  static createJob = async (req, res, next) => {
    try {
      jobValidation.validateCreateJobPayload(req.body);

      const companyId = req.user.company.id;
      const job = await JobService.create(companyId, req.body);

      return res.status(201).json(
        successResponse({
          message: 'Create job succcess',
          data: {
            id: job.id,
            slug: job.slug,
          },
        }),
      );
    } catch (error) {
      next(error);
    }
  };

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

  static saveJob = async (req, res, next) => {
    try {
      const { slug: jobSlug } = req.params;

      const savedJob = await JobService.saveJob({
        jobSlug,
        userId: req.user.user.id,
      });

      return res.status(200).json(
        successResponse({
          message: 'Success save job',
          data: {
            job: {
              id: savedJob.jobId,
              slug: jobSlug,
            },
          },
        }),
      );
    } catch (error) {
      next(error);
    }
  };

  static unsaveJob = async (req, res, next) => {
    try {
      const { slug: jobSlug } = req.params;

      await JobService.unsaveJob({
        jobSlug,
        userId: req.user.user.id,
      });

      return res.status(200).json(
        successResponse({
          message: 'Success unsave job.',
        }),
      );
    } catch (error) {
      next(error);
    }
  };

  static rejectAllApplicant = async (req, res, next) => {
    const { slug } = req.params;
    try {
      const rejectedApplicant = await ApplicantService.rejectAllApplicants(slug);

      return res.status(200).json(
        successResponse({
          message: 'Success reject all applicants',
          data: {
            totalReject: rejectedApplicant.count,
          },
        }),
      );
    } catch (error) {
      next(error);
    }
  };
}

module.exports = JobController;
