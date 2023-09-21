const { successResponse } = require('../../lib/response');
const { getPaginationStatus } = require('../../lib/pagination');
const ApplicantService = require('../../services/applicant');
const { isNumber } = require('../../lib/common');
const JobService = require('../../services/job');
const FirebaseStorage = require('../../lib/firebase/FirebaseStorage');
const folderStorage = require('../../constants/folderStorage');

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

  static applyJob = async (req, res, next) => {
    try {
      const { slug: jobSlug } = req.params;
      const { id: jobId } = req.body;
      const { file } = req;
      const { url } = await FirebaseStorage.upload(file, {
        folder: folderStorage.firebaseStorage.RESUME,
      });

      await JobService.applyJob({ jobSlug, jobId, userId: req.user.user.id, url });

      return res.status(200).json(
        successResponse({
          message: 'Success apply job',
          data: {
            jobId,
            jobSlug,
          },
        }),
      );
    } catch (error) {
      next(error);
    }
  };
}

module.exports = JobController;
