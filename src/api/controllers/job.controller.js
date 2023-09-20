// const { PlaceMethoded, JobType, JobStatus } = require('@prisma/client');
// const prisma = require('../../lib/prisma');
// const slugify = require('slugify');
const { successResponse } = require('../../lib/response');
const jobValidation = require('../../validations/job');
const JobService = require('../../services/job');

class JobController {
  static createJob = async (req, res, next) => {
    console.log(req.body);
    try {
      jobValidation.validateCreateJobPayload(req.body);

      await JobService.create(req.user.company.id, req.body);

      return res.status(201).json(
        successResponse({
          message: 'Create job succcess',
          data: {},
        }),
      );
    } catch (error) {
      next(error);
    }
  };
}

module.exports = JobController;
