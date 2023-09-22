const prisma = require('../../src/lib/prisma');

const USER_CERTIFICATES = [
  {
    id: 'b0c078fa-5576-11ee-8c99-0242ac111112',
    userId: '57ea8afe-5576-11ee-8c99-0242ac120002',
    name: 'AWS Certified Solutions Architect - Associate',
    organization: 'Amazon Web Services',
    issueDate: new Date('2021-09-01'),
    expiredDate: new Date('2023-09-01'),
    credentialId: '1234567890',
    credentialUrl: 'https://www.credly.com/badges/1234567890',
  },
  {
    id: 'b0c078fa-5576-11ee-8c99-0242ac111113',
    userId: '57ea8afe-5576-11ee-8c99-0242ac120002',
    name: 'Hackerrank Problem Solving (Basic)',
    organization: 'Hackerrank',
    credentialId: '1234567890',
  },
];

const seedUserCertificate = async () => {
  await Promise.all(
    USER_CERTIFICATES.map(async (userCertificate) => {
      await prisma.userCertificate.upsert({
        where: { id: userCertificate.id },
        update: {},
        create: userCertificate,
      });
    }),
  );
};

module.exports = seedUserCertificate;
