/* eslint-disable max-len */
const prisma = require('../../src/lib/prisma');

const USER_WORK_EXPERIENCES = [
  {
    id: 'b0c078fa-5576-11ee-8c99-0242ac140112',
    userId: '57ea8afe-5576-11ee-8c99-0242ac120002',
    companyName: 'Google',
    title: 'Software Engineer',
    startDate: new Date('2016-09-01'),
    endDate: new Date('2020-09-01'),
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl vitae tincidunt ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nunc vitae nisl. Donec auctor, nisl vitae tincidunt ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nunc vitae nisl.',
  },
  {
    id: 'b0c078fa-5576-11ee-8c99-0242ac440113',
    userId: '57ea8afe-5576-11ee-8c99-0242ac120002',
    companyName: 'Facebook',
    title: 'Software Engineer',
    startDate: new Date('2016-09-01')
  }
];

const seedUserWorkExperience = async () => {
  await Promise.all(
    USER_WORK_EXPERIENCES.map(async (userWorkExperience) => {
      await prisma.userWorkExperience.upsert({
        where: { id: userWorkExperience.id },
        update: {},
        create: userWorkExperience,
      });
    }),
  );
};

module.exports = seedUserWorkExperience;
