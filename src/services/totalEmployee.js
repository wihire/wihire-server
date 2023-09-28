const prisma = require('../lib/prisma');

class TotalEmployeeService {
  static getAll = async (filters) => {
    const totalEmployees = prisma.companyTotalEmployee.findMany({
      skip: (filters.page - 1) * filters.limit,
      take: filters.limit,
    });

    return totalEmployees;
  };

  static getAllCount = async () => {
    const totalEmployeesCount = prisma.companyTotalEmployee.count();

    return totalEmployeesCount;
  };
}

module.exports = TotalEmployeeService;
