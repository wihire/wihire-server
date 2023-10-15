const { successResponse } = require('../../lib/response');
const { getPaginationStatus } = require('../../lib/pagination');
const ApplicantService = require('../../services/applicant');
const { isNumber } = require('../../lib/common');
const JobService = require('../../services/job');
const jobValidation = require('../../validations/job');
const applicantValidation = require('../../validations/applicant');
const JOB_TYPE = require('../../constants/jobType');
const InvariantError = require('../../exceptions/InvariantError');
const { VALIDATION_ERR } = require('../../constants/errorType');
const PLACE_METHOD = require('../../constants/pladeMethod');
const JOB_STATUS = require('../../constants/jobStatus');
const ROLE = require('../../constants/role');

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

  static updateJob = async (req, res, next) => {
    try {
      jobValidation.validateUpdateJobPayload(req.body);

      const { slug } = req.params;
      const job = await JobService.update(slug, req.body);

      return res.status(200).json(
        successResponse({
          message: 'Update job succcess',
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

  static getJobs = async (req, res, next) => {
    try {
      let { page, limit } = req.query;

      if (!page || !isNumber(page)) page = 1;
      if (!limit || !isNumber(limit)) limit = 15;

      if (req.query?.['job-types']) {
        req.query['job-types'].forEach((jobType) => {
          const jobTypesValues = Object.values(JOB_TYPE);
          if (!jobTypesValues.includes(jobType)) {
            throw new InvariantError(`Job type is not valid (${jobTypesValues.join(', ')})`, {
              type: VALIDATION_ERR,
            });
          }
        });
      }

      if (req.query?.['min-salary']) {
        if (!isNumber(req.query['min-salary'])) {
          throw new InvariantError('Minimal salary is not valid. Must be a number', {
            type: VALIDATION_ERR,
          });
        }
      }

      if (req.query?.['place-methods']) {
        req.query?.['place-methods']?.forEach((placeMethod) => {
          const placeMethodsValues = Object.values(PLACE_METHOD);
          if (!placeMethodsValues.includes(placeMethod)) {
            throw new InvariantError(
              `Place method is not valid (${placeMethodsValues.join(', ')})`,
              {
                type: VALIDATION_ERR,
              },
            );
          }
        });
      }

      if (req.query?.status) {
        const statusValues = Object.values(JOB_STATUS);
        if (!statusValues.includes(req.query.status)) {
          throw new InvariantError(`Status is not valid (${statusValues.join(', ')})`, {
            type: VALIDATION_ERR,
          });
        }
      }

      const filters = {
        ...req.query,
        page: +page,
        limit: +limit,
      };

      const userId = req.user.role === ROLE.USER ? req.user.user.id : req.user.company.id;
      const totalJobs = await JobService.getJobTotal(userId, filters);
      const pagination = getPaginationStatus(page, limit, totalJobs);
      const jobs = await JobService.getAllJobs(userId, filters);

      return res.status(200).json(
        successResponse({
          message: 'Success get jobs',
          data: {
            jobs,
          },
          pagination,
        }),
      );
    } catch (error) {
      next(error);
    }
  };

  static getApplicants = async (req, res, next) => {
    try {
      const { slug } = req.params;
      let { page, limit } = req.query;

      if (!page || !isNumber(page)) page = 1;
      if (!limit || !isNumber(limit)) limit = 15;

      const filters = {
        ...req.query,
        page: +page,
        limit: +limit,
      };

      const applicants = await ApplicantService.getApplicantsJob({
        jobSlug: slug,
        companyId: req.user.company.id,
        filters,
      });
      const totalData = await ApplicantService.getApplicantTotal(slug);

      const pagination = getPaginationStatus(page, limit, totalData);

      return res.status(200).json(
        successResponse({
          message: 'Get applicants job successfully',
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
    const companyId = req.user.company.id;

    try {
      const rejectedApplicant = await ApplicantService.rejectAllApplicants(slug, companyId);

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

  static applyJob = async (req, res, next) => {
    try {
      const { slug: jobSlug } = req.params;
      const { file: resume } = req;

      if (!resume && !req.body?.resumeUrl) {
        throw new InvariantError('Resume is required', {
          type: VALIDATION_ERR,
        });
      }

      const jobApplied = await JobService.applyJob({
        jobSlug,
        userId: req.user.user.id,
        file: resume,
        resumeUrl: req.body?.resumeUrl,
      });

      return res.status(200).json(
        successResponse({
          message: 'Success apply job',
          data: {
            job: {
              id: jobApplied.jobId,
            },
          },
        }),
      );
    } catch (error) {
      next(error);
    }
  };

  static deleteJob = async (req, res, next) => {
    try {
      const { slug: jobSlug } = req.params;

      await JobService.deleteJob({
        jobSlug,
        companyId: req.user.company.id,
      });

      return res.status(200).json(
        successResponse({
          message: 'Success delete job',
        }),
      );
    } catch (error) {
      next(error);
    }
  };

  static getJobDetailBySlug = async (req, res, next) => {
    try {
      const { slug } = req.params;

      const job = await JobService.getJobDetailBySlug({
        jobSlug: slug,
        userId: req.user.role === ROLE.USER ? req.user.user.id : req.user.company.id,
      });

      return res.status(200).json(
        successResponse({
          message: 'Success get job',
          data: {
            job,
          },
        }),
      );
    } catch (error) {
      next(error);
    }
  };

  static updateApplicant = async (req, res, next) => {
    try {
      applicantValidation.validateUpdateApplicantPayload(req.body);

      const { slug: jobSlug, userSlug } = req.params;

      await ApplicantService.updateStatusApplicant({
        companyId: req.user.company.id,
        jobSlug,
        userSlug,
        payload: req.body,
      });

      return res.status(200).json(
        successResponse({
          message: 'Success update job applicant',
        }),
      );
    } catch (error) {
      next(error);
    }
  };

  static getApplicantDetails = async (req, res, next) => {
    try {
      const { slug: jobSlug, userSlug } = req.params;

      const applicant = await ApplicantService.getApplicantDetails({
        companyId: req.user.company.id,
        jobSlug,
        userSlug,
      });

      return res.status(200).json(
        successResponse({
          message: 'Success get applicant',
          data: {
            applicant,
          },
        }),
      );
    } catch (error) {
      next(error);
    }
  };
}

module.exports = JobController;
