const { successResponse, clientErrorResponse } = require('../../lib/response');
const JobService = require('../../services/job');
const { getPaginationStatus } = require('../../lib/pagination');
const { CLIENT_ERR } = require('../../constants/errorType');

class JobController {
  static listJobs = async (req, res, next) => {
    try {
      const { page, limit } = req.query;
      if (!!page !== !!limit) {
        return res.status(400).json(
          clientErrorResponse({
            message: 'Bad request',
            type: CLIENT_ERR,
          }),
        );
      }

      const totalJobs = await JobService.countJobs(req.query, req.user.user.id);
      const pagination = getPaginationStatus(page, limit, totalJobs);
      const jobs = await JobService.getAllJobs(req.query, req.user.user.id);

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
}

module.exports = JobController;
