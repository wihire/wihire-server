const prisma = require('../lib/prisma');
const JobService = require('./job');

class ApplicationService {
  static getUserApplication = async ({ userId, applicationStatus, page, limit }) => {
    const applications = await prisma.applicationList.findMany({
      where: {
        userId,
        status: applicationStatus,
      },
      include: {
        job: {
          include: {
            company: {
              include: {
                profile: {
                  select: {
                    slug: true,
                    name: true,
                    email: true,
                    avatar: true,
                  },
                },
              },
            },
            rangeSalary: true,
            savedJobs: {
              where: {
                userId: {
                  equals: userId,
                },
              },
            },
          },
        },
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    applications.forEach((application) => {
      delete application.userId;
      delete application.jobId;

      application.job = JobService.simpleJobMapping(application.job);
    });

    return applications;
  };

  static getApplicationTotal = async ({ userId, applicationStatus }) => {
    const totalApplication = await prisma.applicationList.count({
      where: {
        userId,
        status: applicationStatus,
      },
    });

    return totalApplication;
  };
}

module.exports = ApplicationService;
