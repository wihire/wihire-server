const prisma = require('../lib/prisma');

class ProfileService {
  static getProfile = async (slug) => {
    const profile = await prisma.profile.findUnique({
      where: {
        slug,
      },
      include: {
        user: {
          include: {
            userEducations: true,
            userSkills: true,
            userWorkExperiencies: true,
            userProjects: true,
            userCertificates: true,
          },
        },
        company: {
          include: {
            companyScope: true,
            companyTotalEmployee: true,
          },
        },
      },
    });
    return profile;
  };
}

module.exports = ProfileService;
