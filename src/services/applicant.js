const prisma = require('../lib/prisma');
const JobService = require('./job');
const STATUS_APPLICATION = require('../constants/statusApplication');
const UserService = require('./user');
const NotFoundError = require('../exceptions/NotFoundError');
const { NOT_FOUND_ERR } = require('../constants/errorType');

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

  static updateStatusApplicant = async (jobSlug, userSlug, newStatus) => {
    const user = await UserService.getUserIdByProfileSlug(userSlug);
    const job = await JobService.getBySlug(jobSlug);

    const application = await prisma.applicationList.findFirst({
      where: {
        AND: [
          {
            userId: user.user.id,
          },
          {
            jobId: job.id,
          },
        ],
      },
      select: {
        id: true,
      },
    });

    if (!application) {
      throw new NotFoundError('Application not found', { type: NOT_FOUND_ERR });
    }

    const updatedApplicant = await prisma.applicationList.update({
      where: {
        id: application?.id,
      },
      data: {
        status: newStatus,
        updatedAt: new Date(),
      },
    });

    return updatedApplicant;
  };
}

module.exports = ApplicantService;
