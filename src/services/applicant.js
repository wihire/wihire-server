const prisma = require('../lib/prisma');
const JobService = require('./job');
const STATUS_APPLICATION = require('../constants/statusApplication');

class ApplicantService {
  static getApplicants = async ({ jobSlug, page, limit }) => {
    const job = await JobService.getBySlug(jobSlug);

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

    const applicationsJob = await prisma.applicationList.count({
      where: {
        jobId: job.id,
      },
    });

    return applicationsJob;
  };

  static rejectAllApplicants = async (jobSlug) => {
    const job = await JobService.getBySlug(jobSlug);

    const rejectedApplicant = await prisma.applicationList.updateMany({
      where: {
        jobId: job.id,
        NOT: [
          {
            OR: [
              {
                status: STATUS_APPLICATION.DECLINE,
              },
              {
                status: STATUS_APPLICATION.APPROVED,
              },
            ],
          },
        ],
      },
      data: {
        status: STATUS_APPLICATION.DECLINE,
      },
    });

    return rejectedApplicant;
  };
}

module.exports = ApplicantService;
