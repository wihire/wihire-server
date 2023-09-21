const prisma = require('../lib/prisma');
const NotFoundError = require('../exceptions/NotFoundError');

class ApplicationService {
  static getUserAppliation = async (userData, applicationStatus, page, limit) => {
    if (!userData) {
      throw new NotFoundError('User Not Found');
    }
    const applications = await prisma.applicationList.findMany({
      where: {
        userId: userData.id,
        status: applicationStatus,
      },
      select: {
        job: {
          select: {
            id: true,
            title: true,
            slug: true,

            company: {
              select: {
                profile: {
                  select: {
                    id: true,
                    name: true,
                    slug: true,
                    avatar: true,
                  },
                },
              },
            },

            address: true,
            placeMethod: true,
            jobType: true,
            salary: {
              select: {
                id: true,
                min: true,
                max: true,
              },
            },

            // INI DICOBA DULU

            // savedJob: {
            //   where: {
            //     userId: userData.id
            //   }
            // },

            createdAt: true,
            updatedAt: true,
          },
        },
        status: true,
        createdAt: true,
        updatedAt: true,
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    const checkIsSavedJob = async (jobData) => {
      const saved = await prisma.savedJob.findFirst({
        where: {
          AND: [
            {
              userId: userData.id,
            },
            {
              jobId: jobData.job.id,
            },
          ],
        },
      });
      if (saved) {
        return true;
      }
      return false;
    };

    // Go through all job data and see if it is in savedJob or not
    const isSavedjob = await Promise.all(
      applications.map(async (application) => await checkIsSavedJob(application)),
    );

    // Formatting the data
    const applicationClean = applications.map((application, i) => ({
      ...application.job,
      isSaved: isSavedjob[i],
    }));

    return applicationClean;
  };

  static getApplicationTotal = async (userData, applicationStatus) => {
    if (!userData) {
      throw new NotFoundError('User Not Found');
    }
    const totalApplication = await prisma.applicationList.count({
      where: {
        userId: userData.id,
        status: applicationStatus,
      },
    });

    return totalApplication;
  };
}

module.exports = ApplicationService;
