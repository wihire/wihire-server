const prisma = require('../../src/lib/prisma');

const USER_EDUCATIONS = [
  {
    id: 'b0c078fa-5576-11ee-8c99-0242ac120112',
    userId: '57ea8afe-5576-11ee-8c99-0242ac120002',
    name: 'Universitas Indonesia',
    startDate: new Date('2016-09-01'),
    endDate: new Date('2020-09-01'),
    field: 'Computer Science',
    grade: 3.5,
    maxGrade: 4,
  },
  {
    id: 'b0c078fa-5576-11ee-8c99-0242ac120113',
    userId: '57ea8afe-5576-11ee-8c99-0242ac120002',
    name: 'Harvard',
    startDate: new Date('2021-09-01'),
    endDate: new Date('2023-09-01'),
    field: 'Computer Science'
  },
];

const seedUserEducation = async () => {
  await Promise.all(
    USER_EDUCATIONS.map(async (userEducation) => {
      await prisma.userEducation.upsert({
        where: { id: userEducation.id },
        update: {},
        create: userEducation,
      });
    }),
  );
};

module.exports = seedUserEducation;
