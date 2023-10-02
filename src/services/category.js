const prisma = require('../lib/prisma');

class CategoryService {
  static getAll = async (filters) => {
    const categories = prisma.category.findMany({
      where: {
        title: {
          contains: filters?.title,
          mode: 'insensitive',
        },
      },
      skip: (filters.page - 1) * filters.limit,
      take: filters.limit,
      orderBy: {
        title: 'asc',
      },
    });

    return categories;
  };

  static getAllCount = async (filters) => {
    const categoriesCount = prisma.category.count({
      where: {
        title: {
          contains: filters?.title,
          mode: 'insensitive',
        },
      },
    });

    return categoriesCount;
  };
}

module.exports = CategoryService;
