const prisma = require('../lib/prisma');
const JobService = require('./job');
const NotFoundError = require('../exceptions/NotFoundError');

class ApplicantsService {
  // Gets user info that applied to the job
  static getApplicants = async (jobSlug, page, limit) => {
    const job = await JobService.getBySlug(jobSlug);

    if (!job) {
      throw new NotFoundError('Job not found');
    }

    const applicationsJob = await prisma.applicationList.findMany({
      where: {
        jobId: job.id,
      },
      include: {
        user: {
          include: {
            salaryExpectation: true,
          },
        },
      },
      skip: page,
      take: limit,
    });

    return applicationsJob;
  };

  static getApplicantTotal = async (jobSlug) => {
    const job = await JobService.getBySlug(jobSlug);

    if (!job) {
      throw new NotFoundError('Job not found');
    }

    const applicationsJob = await prisma.applicationList.count({
      where: {
        jobId: job.id,
      },
    });

    return applicationsJob;
  };
}

module.exports = ApplicantsService;
