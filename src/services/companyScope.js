const prisma = require('../lib/prisma');

class CompanyScopeService {
  static getAll = async (filters) => {
    const companyScopes = prisma.companyScope.findMany({
      where: {
        name: {
          contains: filters?.name,
          mode: 'insensitive',
        },
      },
      skip: (filters.page - 1) * filters.limit,
      take: filters.limit,
      orderBy: {
        name: 'asc',
      },
    });

    return companyScopes;
  };

  static getAllCount = async (filters) => {
    const companyScopesCount = prisma.companyScope.count({
      where: {
        name: {
          contains: filters?.name,
          mode: 'insensitive',
        },
      },
    });

    return companyScopesCount;
  };
}

module.exports = CompanyScopeService;
