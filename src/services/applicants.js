const prisma = require('../lib/prisma');

class ApplicantsService {
  // Gets user info that applied to the job
  static getApplicants = async (jobSlug, page, limit) => {
    const jobs = await prisma.job.findMany({
      where: {
        slug: jobSlug,
      },
      select: {
        applicationList: {
          skip: page,
          take: limit,
          select: {
            user: true,
          },
        },
      },
    });
    return jobs[0];
  };

  // Declines all applicant that is not "APPROVED"
  static rejectAllApplicants = async (jobSlug) => {
    const rejectAll = await prisma.job.update({
      where: {
        slug: jobSlug,
      },
      data: {
        applicationList: {
          updateMany: {
            where: {
              NOT: [
                {
                  status: 'APPROVED',
                },
              ],
              // status: {}
            },
            data: {
              status: 'DECLINE',
            },
          },
        },
      },
      include: {
        // applicationList: true,
        _count: {
          select: {
            applicationList: {
              where: {
                NOT: [
                  {
                    status: 'APPROVED',
                  },
                ],
              },
            },
          },
        },
      },
    });
    return rejectAll;
  };
}

module.exports = ApplicantsService;
