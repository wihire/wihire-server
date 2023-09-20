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
}

module.exports = ApplicantsService;
