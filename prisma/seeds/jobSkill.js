const prisma = require('../../src/lib/prisma');

const JOBSKILL = [
  {
    id: '1c263866-5769-11ee-8c99-0242ac120002',
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8817',
      },
    },
    skill: {
      connect: {
        id: '544e908a-54cb-11ee-8c99-0242ac120005',
      },
    },
  },
  {
    id: '1c263b36-5769-11ee-8c99-0242ac120002',
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8817',
      },
    },
    skill: {
      connect: {
        id: '544e908a-54cb-11ee-8c99-0242ac120007',
      },
    },
  },
  {
    id: '1c263cd0-5769-11ee-8c99-0242ac120002',
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8817',
      },
    },
    skill: {
      connect: {
        id: '544e908a-54cb-11ee-8c99-0242ac120021',
      },
    },
  },
  {
    id: '1c263e38-5769-11ee-8c99-0242ac120002',
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8818',
      },
    },
    skill: {
      connect: {
        id: '544e908a-54cb-11ee-8c99-0242ac120003',
      },
    },
  },
  {
    id: '1c263fb4-5769-11ee-8c99-0242ac120002',
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8818',
      },
    },
    skill: {
      connect: {
        id: '544e908a-54cb-11ee-8c99-0242ac120009',
      },
    },
  },
  {
    id: '1c264586-5769-11ee-8c99-0242ac120002',
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8818',
      },
    },
    skill: {
      connect: {
        id: '544e908a-54cb-11ee-8c99-0242ac120049',
      },
    },
  },
  {
    id: '1c264914-5769-11ee-8c99-0242ac120002',
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8819',
      },
    },
    skill: {
      connect: {
        id: '544e908a-54cb-11ee-8c99-0242ac120006',
      },
    },
  },
  {
    id: '1c264afe-5769-11ee-8c99-0242ac120002',
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8819',
      },
    },
    skill: {
      connect: {
        id: '544e908a-54cb-11ee-8c99-0242ac120010',
      },
    },
  },
  {
    id: '1c264ca2-5769-11ee-8c99-0242ac120002',
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8819',
      },
    },
    skill: {
      connect: {
        id: '544e908a-54cb-11ee-8c99-0242ac120049',
      },
    },
  },
  {
    id: '1c264df6-5769-11ee-8c99-0242ac120002',
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8820',
      },
    },
    skill: {
      connect: {
        id: '544e908a-54cb-11ee-8c99-0242ac120003',
      },
    },
  },
  {
    id: '1c264f18-5769-11ee-8c99-0242ac120002',
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8820',
      },
    },
    skill: {
      connect: {
        id: '544e908a-54cb-11ee-8c99-0242ac120004',
      },
    },
  },
  {
    id: '1c265030-5769-11ee-8c99-0242ac120002',
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8820',
      },
    },
    skill: {
      connect: {
        id: '544e908a-54cb-11ee-8c99-0242ac120016',
      },
    },
  },
  {
    id: '1c2654d6-5769-11ee-8c99-0242ac120002',
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8821',
      },
    },
    skill: {
      connect: {
        id: '544e908a-54cb-11ee-8c99-0242ac120010',
      },
    },
  },
  {
    id: '1c265616-5769-11ee-8c99-0242ac120002',
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8821',
      },
    },
    skill: {
      connect: {
        id: '544e908a-54cb-11ee-8c99-0242ac120014',
      },
    },
  },
  {
    id: '1c26572e-5769-11ee-8c99-0242ac120002',
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8821',
      },
    },
    skill: {
      connect: {
        id: '544e908a-54cb-11ee-8c99-0242ac120016',
      },
    },
  },
  {
    id: '1c26583c-5769-11ee-8c99-0242ac120002',
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8822',
      },
    },
    skill: {
      connect: {
        id: '544e908a-54cb-11ee-8c99-0242ac120002',
      },
    },
  },
  {
    id: '1c265954-5769-11ee-8c99-0242ac120002',
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8822',
      },
    },
    skill: {
      connect: {
        id: '544e908a-54cb-11ee-8c99-0242ac120003',
      },
    },
  },
  {
    id: '1c265a6c-5769-11ee-8c99-0242ac120002',
    job: {
      connect: {
        id: '6a58a4c1-5aaf-4307-be09-82f3879c8822',
      },
    },
    skill: {
      connect: {
        id: '544e908a-54cb-11ee-8c99-0242ac120004',
      },
    },
  },
];

const seedJobSkill = async () => {
  await Promise.all(
    JOBSKILL.map(async (jobSkill) => {
      await prisma.jobSkill.upsert({
        where: { id: jobSkill.id },
        update: {},
        create: jobSkill,
      });
    }),
  );
};

module.exports = seedJobSkill;
