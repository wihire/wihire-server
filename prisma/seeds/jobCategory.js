const prisma = require('../../src/lib/prisma');

const JOB_CATEGORIES = [
  {
    id: 'f613a332-56e8-11ee-8c99-0242ac120002',
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8817',
      },
    },
    categories: {
      connect: {
        id: '5c99b520-54cc-11ee-8c99-0242ac120009',
      },
    },
  },
  {
    id: 'f613a616-56e8-11ee-8c99-0242ac120002',
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8817',
      },
    },
    categories: {
      connect: {
        id: '5c99b520-54cc-11ee-8c99-0242ac120005',
      },
    },
  },
  {
    id: 'f613a99a-56e8-11ee-8c99-0242ac120002',
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8818',
      },
    },
    categories: {
      connect: {
        id: '5c99b520-54cc-11ee-8c99-0242ac120005',
      },
    },
  },
  {
    id: 'f613aaee-56e8-11ee-8c99-0242ac120002',
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8818',
      },
    },
    categories: {
      connect: {
        id: '5c99b520-54cc-11ee-8c99-0242ac120009',
      },
    },
  },
  {
    id: 'f613ac1a-56e8-11ee-8c99-0242ac120002',
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8818',
      },
    },
    categories: {
      connect: {
        id: '5c99b520-54cc-11ee-8c99-0242ac120012',
      },
    },
  },
  {
    id: 'f613b002-56e8-11ee-8c99-0242ac120002',
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8819',
      },
    },
    categories: {
      connect: {
        id: '5c99b520-54cc-11ee-8c99-0242ac120002',
      },
    },
  },
  {
    id: 'f613b1d8-56e8-11ee-8c99-0242ac120002',
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8819',
      },
    },
    categories: {
      connect: {
        id: '5c99b520-54cc-11ee-8c99-0242ac120003',
      },
    },
  },
  {
    id: 'f613b390-56e8-11ee-8c99-0242ac120002',
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8819',
      },
    },
    categories: {
      connect: {
        id: '5c99b520-54cc-11ee-8c99-0242ac120006',
      },
    },
  },
  {
    id: 'f613b638-56e8-11ee-8c99-0242ac120002',
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8819',
      },
    },
    categories: {
      connect: {
        id: '5c99b520-54cc-11ee-8c99-0242ac120019',
      },
    },
  },
  {
    id: 'f613b7d2-56e8-11ee-8c99-0242ac120002',
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8819',
      },
    },
    categories: {
      connect: {
        id: '5c99b520-54cc-11ee-8c99-0242ac120020',
      },
    },
  },
  {
    id: 'f613b93a-56e8-11ee-8c99-0242ac120002',
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8820',
      },
    },
    categories: {
      connect: {
        id: '5c99b520-54cc-11ee-8c99-0242ac120006',
      },
    },
  },
  {
    id: 'f613bb92-56e8-11ee-8c99-0242ac120002',
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8820',
      },
    },
    categories: {
      connect: {
        id: '5c99b520-54cc-11ee-8c99-0242ac120020',
      },
    },
  },
  {
    id: 'f613bd36-56e8-11ee-8c99-0242ac120002',
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8820',
      },
    },
    categories: {
      connect: {
        id: '5c99b520-54cc-11ee-8c99-0242ac120022',
      },
    },
  },
  {
    id: 'f613bfde-56e8-11ee-8c99-0242ac120002',
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8820',
      },
    },
    categories: {
      connect: {
        id: '5c99b520-54cc-11ee-8c99-0242ac120028',
      },
    },
  },
  {
    id: 'f613c16e-56e8-11ee-8c99-0242ac120002',
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8821',
      },
    },
    categories: {
      connect: {
        id: '5c99b520-54cc-11ee-8c99-0242ac120002',
      },
    },
  },
  {
    id: 'f613c2c2-56e8-11ee-8c99-0242ac120002',
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8821',
      },
    },
    categories: {
      connect: {
        id: '5c99b520-54cc-11ee-8c99-0242ac120003',
      },
    },
  },
  {
    id: 'f613c470-56e8-11ee-8c99-0242ac120002',
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8821',
      },
    },
    categories: {
      connect: {
        id: '5c99b520-54cc-11ee-8c99-0242ac120006',
      },
    },
  },
  {
    id: 'f613c9fc-56e8-11ee-8c99-0242ac120002',
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8821',
      },
    },
    categories: {
      connect: {
        id: '5c99b520-54cc-11ee-8c99-0242ac120011',
      },
    },
  },
  {
    id: 'f613cbdc-56e8-11ee-8c99-0242ac120002',
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8821',
      },
    },
    categories: {
      connect: {
        id: '5c99b520-54cc-11ee-8c99-0242ac120020',
      },
    },
  },
  {
    id: 'f613ccfe-56e8-11ee-8c99-0242ac120002',
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8822',
      },
    },
    categories: {
      connect: {
        id: '5c99b520-54cc-11ee-8c99-0242ac120005',
      },
    },
  },
  {
    id: 'f613ce0c-56e8-11ee-8c99-0242ac120002',
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8822',
      },
    },
    categories: {
      connect: {
        id: '5c99b520-54cc-11ee-8c99-0242ac120006',
      },
    },
  },
  {
    id: 'f613d050-56e8-11ee-8c99-0242ac120002',
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8822',
      },
    },
    categories: {
      connect: {
        id: '5c99b520-54cc-11ee-8c99-0242ac120009',
      },
    },
  },
];

const seedJobCategories = async () => {
  await Promise.all(
    JOB_CATEGORIES.map(async (jobCategory) => {
      await prisma.jobCategory.upsert({
        where: { id: jobCategory.id },
        update: {},
        create: jobCategory,
      });
    }),
  );
};

module.exports = seedJobCategories;
