const prisma = require('../../src/lib/prisma');

const SAVED_JOBS = [
  {
    id: '994586d7-77c8-487e-bac7-f40a76639a28',
    userId: '57ea8afe-5576-11ee-8c99-0242ac120003',
    jobId: '6a58a4c1-5aaf-4307-be09-82f3879c8817',
  },
];

const seedSavedjob = async () => {
  await Promise.all(
    SAVED_JOBS.map(async (job) => {
      await prisma.savedJob.upsert({
        where: { id: job.id },
        update: {},
        create: job,
      });
    }),
  );
};

module.exports = seedSavedjob;
