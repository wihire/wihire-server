const NotFoundError = require('../exceptions/NotFoundError');
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

    if (!company) {
      throw new NotFoundError('Company not found');
    }

    return company;
  };
}

module.exports = CompanyService;
