const prisma = require('../lib/prisma');
const UserService = require('../services/user');
const NotFoundError = require('../exceptions/NotFoundError');


class ApplicationService {
  static getUserAppliation = async (applicationStatus, page, limit) => {
    // Change this to something ELSE
    const user = await UserService.getProfileUserByProfileId(
      '5b360590-5575-11ee-8c99-0242ac120003',
    );

  

    if (!user) {
      throw new NotFoundError('User Not Found');
    }
    const applications = await prisma.applicationList.findMany({
      where: {
        //TEMP
        userId: user.user.id,
        status: applicationStatus,
      },
      select: {
        job: {
          select: {
            id: true,
            title: true,
            slug: true,
            // savedJob: {

            // },

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

            // savedJob: {

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
      take: limit
    });

    return applications;
  };


  static getApplicationTotal = async (applicationStatus) => {
    // Change this to something ELSE
    const user = await UserService.getProfileUserByProfileId(
      '5b360590-5575-11ee-8c99-0242ac120003',
    );


    if (!user) {
      throw new NotFoundError('User Not Found');
    }
    const totalApplication = await prisma.applicationList.count({
      where: {
        //TEMP
        userId: user.user.id,
        status: applicationStatus,
      },
    })

    return totalApplication;
  }
}

module.exports = ApplicationService;
