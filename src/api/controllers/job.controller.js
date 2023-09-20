const { successResponse } = require('../../lib/response');
const JobService = require('../../services/job');

class JobController {
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
}

module.exports = JobController;
