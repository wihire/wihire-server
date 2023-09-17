const prisma = require('../../src/lib/prisma');

const SALARY = [
  {
    id: 'b0c078fa-5576-11ee-8c99-0242ac120002',
    min: 4000000
  },
  {
    id: 'b0c078fa-5576-11ee-8c99-0242ac120003',
    min: 6000000
  },
  {
    id: 'b0c078fa-5576-11ee-8c99-0242ac120004',
    min: 8000000,
    max: 10000000
  },
  {
    id: 'b0c078fa-5576-11ee-8c99-0242ac120005',
    min: 4000000,
    max: 5000000
  },
  {
    id: 'b0c078fa-5576-11ee-8c99-0242ac120006',
    min: 8000000
  },
  {
    id: 'b0c078fa-5576-11ee-8c99-0242ac120008',
    min: 7000000
  },
  {
    id: 'b0c078fa-5576-11ee-8c99-0242ac120009',
    min: 18000000,
    max: 20000000
  }
];

const seedSalary = async () => {
  await Promise.all(
    SALARY.map(async (salary) => {
      await prisma.salary.upsert({
        where: { id: salary.id },
        update: {},
        create: salary,
      });
    }),
  );
};

module.exports = seedSalary;
