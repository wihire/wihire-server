const prisma = require('../lib/prisma');

class CompanyService {
  static getProfileCompanyByProfileId = async (id) => {
    const company = await prisma.profile.findUnique({
      where: {
        id,
      },
      include: {
        company: true,
      },
    });

    return company;
  };
}

module.exports = CompanyService;
