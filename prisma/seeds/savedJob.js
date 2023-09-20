const prisma = require('../../src/lib/prisma');

const SAVEDJOB = [
  {
    id: 'ae8d6a8a-5764-11ee-8c99-0242ac120002',
    user: {
      connect: {
        id: '57ea8afe-5576-11ee-8c99-0242ac120002',
      },
    },
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8817',
      },
    },
  },
  {
    id: 'ae8d6ce2-5764-11ee-8c99-0242ac120002',
    user: {
      connect: {
        id: '57ea8afe-5576-11ee-8c99-0242ac120002',
      },
    },
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8818',
      },
    },
  },
  {
    id: 'ae8d6e18-5764-11ee-8c99-0242ac120002',
    user: {
      connect: {
        id: '57ea8afe-5576-11ee-8c99-0242ac120002',
      },
    },
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8821',
      },
    },
  },
  {
    id: 'ae8d6f3a-5764-11ee-8c99-0242ac120002',
    user: {
      connect: {
        id: '57ea8afe-5576-11ee-8c99-0242ac120002',
      },
    },
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8822',
      },
    },
  },
  {
    id: 'ae8d70ac-5764-11ee-8c99-0242ac120002',
    user: {
      connect: {
        id: '57ea8afe-5576-11ee-8c99-0242ac120003',
      },
    },
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8817',
      },
    },
  },
  {
    id: 'ae8d71f6-5764-11ee-8c99-0242ac120002',
    user: {
      connect: {
        id: '57ea8afe-5576-11ee-8c99-0242ac120003',
      },
    },
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8819',
      },
    },
  },
  {
    id: 'ae8d7534-5764-11ee-8c99-0242ac120002',
    user: {
      connect: {
        id: '57ea8afe-5576-11ee-8c99-0242ac120003',
      },
    },
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8820',
      },
    },
  },
  {
    id: 'ae8d76e2-5764-11ee-8c99-0242ac120002',
    user: {
      connect: {
        id: '57ea8afe-5576-11ee-8c99-0242ac120004',
      },
    },
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8817',
      },
    },
  },
  {
    id: 'ae8d7840-5764-11ee-8c99-0242ac120002',
    user: {
      connect: {
        id: '57ea8afe-5576-11ee-8c99-0242ac120004',
      },
    },
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8821',
      },
    },
  },
  {
    id: 'ae8d7976-5764-11ee-8c99-0242ac120002',
    user: {
      connect: {
        id: '57ea8afe-5576-11ee-8c99-0242ac120005',
      },
    },
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8818',
      },
    },
  },
  {
    id: 'ae8d7a8e-5764-11ee-8c99-0242ac120002',
    user: {
      connect: {
        id: '57ea8afe-5576-11ee-8c99-0242ac120005',
      },
    },
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8819',
      },
    },
  },
  {
    id: 'ae8d7ba6-5764-11ee-8c99-0242ac120002',
    user: {
      connect: {
        id: '57ea8afe-5576-11ee-8c99-0242ac120005',
      },
    },
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8820',
      },
    },
  },
  {
    id: 'ae8d7cbe-5764-11ee-8c99-0242ac120002',
    user: {
      connect: {
        id: '57ea8afe-5576-11ee-8c99-0242ac120005',
      },
    },
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8821',
      },
    },
  },
  {
    id: 'ae8d7dd6-5764-11ee-8c99-0242ac120002',
    user: {
      connect: {
        id: '57ea8afe-5576-11ee-8c99-0242ac120005',
      },
    },
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8822',
      },
    },
  },
];

const seedSavedJob = async () => {
  await Promise.all(
    SAVEDJOB.map(async (savedJob) => {
      await prisma.savedJob.upsert({
        where: { id: savedJob.id },
        update: {},
        create: savedJob,
      });
    }),
  );
};

module.exports = seedSavedJob;
