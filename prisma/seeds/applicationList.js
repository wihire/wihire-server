/* eslint-disable max-len */
const prisma = require('../../src/lib/prisma');

const APPLICATIONS = [
  {
    id: '2243ad84-5582-11ee-8c99-0242ac120002',
    userId: '57ea8afe-5576-11ee-8c99-0242ac120002',
    jobId: '6a58a4c1-5aaf-4307-be09-82f3879c8822',
    resume:
      'https://firebasestorage.googleapis.com/v0/b/wihire-9f2cb.appspot.com/o/resume%2Fresume_miji.pdf?alt=media&token=d3ed784d-2198-4d8a-b49c-fffb70e664c9',
    status: 'APPROVED',
  },
  {
    id: '2243ad84-5582-11ee-8c99-0242ac120003',
    userId: '57ea8afe-5576-11ee-8c99-0242ac120002',
    jobId: '6a58a4c1-5aaf-4307-be09-82f3879c8818',
    resume:
      'https://firebasestorage.googleapis.com/v0/b/wihire-9f2cb.appspot.com/o/resume%2Fresume_miji.pdf?alt=media&token=d3ed784d-2198-4d8a-b49c-fffb70e664c9',
    status: 'DECLINE',
  },
  {
    id: '2243ad84-5582-11ee-8c99-0242ac120004',
    userId: '57ea8afe-5576-11ee-8c99-0242ac120002',
    jobId: '6a58a4c1-5aaf-4307-be09-82f3879c8817',
    resume:
      'https://firebasestorage.googleapis.com/v0/b/wihire-9f2cb.appspot.com/o/resume%2Fresume_miji.pdf?alt=media&token=d3ed784d-2198-4d8a-b49c-fffb70e664c9',
    status: 'DECLINE',
  },
  {
    id: '2243ad84-5582-11ee-8c99-0242ac120005',
    userId: '57ea8afe-5576-11ee-8c99-0242ac120003',
    jobId: '6a58a4c1-5aaf-4307-be09-82f3879c8817',
    resume:
      'https://firebasestorage.googleapis.com/v0/b/wihire-9f2cb.appspot.com/o/resume%2Fresume_rusdai.pdf?alt=media&token=20b3d46e-a4d2-4035-bdb6-9a02fdbbb98c',
    status: 'ONREVIEW',
  },
  {
    id: '2243ad84-5582-11ee-8c99-0242ac120006',
    userId: '57ea8afe-5576-11ee-8c99-0242ac120003',
    jobId: '6a58a4c1-5aaf-4307-be09-82f3879c8818',
    resume:
      'https://firebasestorage.googleapis.com/v0/b/wihire-9f2cb.appspot.com/o/resume%2Fresume_rusdai.pdf?alt=media&token=20b3d46e-a4d2-4035-bdb6-9a02fdbbb98c',
    status: 'DECLINE',
  },
  {
    id: '2243ad84-5582-11ee-8c99-0242ac120007',
    userId: '57ea8afe-5576-11ee-8c99-0242ac120003',
    jobId: '6a58a4c1-5aaf-4307-be09-82f3879c8819',
    resume:
      'https://firebasestorage.googleapis.com/v0/b/wihire-9f2cb.appspot.com/o/resume%2Fresume_rusdai.pdf?alt=media&token=20b3d46e-a4d2-4035-bdb6-9a02fdbbb98c',
    status: 'ONPROGRESS',
  },
  {
    id: '2243ad84-5582-11ee-8c99-0242ac120008',
    userId: '57ea8afe-5576-11ee-8c99-0242ac120003',
    jobId: '6a58a4c1-5aaf-4307-be09-82f3879c8820',
    resume:
      'https://firebasestorage.googleapis.com/v0/b/wihire-9f2cb.appspot.com/o/resume%2Fresume_rusdai.pdf?alt=media&token=20b3d46e-a4d2-4035-bdb6-9a02fdbbb98c',
    status: 'ONPROGRESS',
  },
  {
    id: '2243ad84-5582-11ee-8c99-0242ac120009',
    userId: '57ea8afe-5576-11ee-8c99-0242ac120004',
    jobId: '6a58a4c1-5aaf-4307-be09-82f3879c8817',
    resume:
      'https://firebasestorage.googleapis.com/v0/b/wihire-9f2cb.appspot.com/o/resume%2F1.pdf?alt=media&token=e4486e8a-b109-46ce-a25e-79490f919779',
    status: 'ONPROGRESS',
  },
  {
    id: '2243ad84-5582-11ee-8c99-0242ac120010',
    userId: '57ea8afe-5576-11ee-8c99-0242ac120004',
    jobId: '6a58a4c1-5aaf-4307-be09-82f3879c8818',
    resume:
      'https://firebasestorage.googleapis.com/v0/b/wihire-9f2cb.appspot.com/o/resume%2F1.pdf?alt=media&token=e4486e8a-b109-46ce-a25e-79490f919779',
    status: 'ONREVIEW',
  },
];

const seedApplicationList = async () => {
  await Promise.all(
    APPLICATIONS.map(async (application) => {
      await prisma.applicationList.upsert({
        where: { id: application.id },
        update: {},
        create: application,
      });
    }),
  );
};

module.exports = seedApplicationList;
