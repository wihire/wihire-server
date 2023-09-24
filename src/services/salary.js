const prisma = require('../lib/prisma');

class SalaryService {
  static updateSalaryExpectationUser = async ({ user, payload }) => {
    return prisma.$transaction(async (tx) => {
      let salaryQuery = {};
      const userHasSalaryExpectation = !!user.salaryExpectationId;
      const deleteSalaryExpectation =
        userHasSalaryExpectation && payload?.salaryExpectation === undefined;

      if (deleteSalaryExpectation) {
        salaryQuery = {
          salaryExpectation: {
            disconnect: true,
          },
        };
      } else if (!userHasSalaryExpectation && payload?.salaryExpectation) {
        const newSalary = await tx.salary.create({
          data: {
            min: +payload.salaryExpectation,
          },
        });

        salaryQuery = {
          salaryExpectationId: newSalary.id,
        };
      } else if (userHasSalaryExpectation && payload?.salaryExpectation) {
        salaryQuery = {
          salaryExpectation: {
            update: {
              min: +payload.salaryExpectation,
            },
          },
        };
      }

      await tx.user.update({
        where: {
          id: user.id,
        },
        data: {
          ...salaryQuery,
        },
      });

      if (deleteSalaryExpectation) {
        await tx.salary.delete({
          where: {
            id: user.salaryExpectationId,
          },
        });
      }
    });
  };
}

module.exports = SalaryService;
