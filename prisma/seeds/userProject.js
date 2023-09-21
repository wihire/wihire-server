/* eslint-disable max-len */
const prisma = require('../../src/lib/prisma');

const USER_PROJECTS = [
  {
    id: 'b0c078fa-5576-11ee-8c99-0242ac154112',
    userId: '57ea8afe-5576-11ee-8c99-0242ac120002',
    name: 'Project 1',
    role: 'Software Engineer',
    url: 'https://github.com',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl vitae tincidunt ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nunc vitae nisl. Donec auctor, nisl vitae tincidunt ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nunc vitae nisl.',
    startDate: new Date('2016-09-01'),
    endDate: new Date('2020-09-01'),
  },
  {
    id: 'b0c078fa-5576-11ee-8c99-0242ac154113',
    userId: '57ea8afe-5576-11ee-8c99-0242ac120002',
    name: 'Project 2',
    role: 'Software Engineer',
    startDate: new Date('2017-09-01'),
    endDate: new Date('2021-09-01'),
  }
];

const seedUserProject = async () => {
  await Promise.all(
    USER_PROJECTS.map(async (userProject) => {
      await prisma.userProject.upsert({
        where: { id: userProject.id },
        update: {},
        create: userProject,
      });
    }),
  );
};

module.exports = seedUserProject;
