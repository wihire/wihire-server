const prisma = require('../lib/prisma');
const NotFoundError = require('../exceptions/NotFoundError');
const JobService = require('./job');

class ApplicantService {
  static getApplicants = async ({ jobSlug, page, limit }) => {
    const job = await JobService.getBySlug(jobSlug);

    if (!job) {
      throw new NotFoundError('Job not found');
    }

    const applicationsJobRaw = await prisma.applicationList.findMany({
      where: {
        jobId: job.id,
      },
      select: {
        user: {
          select: {
            id: true,
            salaryExpectation: {
              select: {
                min: true,
              },
            },
            gender: true,
            phoneNumber: true,
            profile: {
              select: {
                slug: true,
                avatar: true,
                province: true,
                address: true,
              },
            },
          },
        },
        resume: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    const applicationsJob = applicationsJobRaw.map((application) => ({
      ...application,
      user: {
        ...application.user,
        salaryExpectation: application.user.salaryExpectation?.min,
      },
    }));

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

module.exports = ApplicantService;
