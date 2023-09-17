/* eslint-disable max-len */
const prisma = require('../../src/lib/prisma');

const USERS = [
  {
    profile: {
      id: '5b360590-5575-11ee-8c99-0242ac120002',
      slug: 'mizi-aji-pratama-459f94b4',
      name: 'Mizi Aji Pratama',
      email: 'mijiaji17@gmail.com',
      password: '$2a$12$LTOi11NMa/0zkKYFJQKkl.PAIoMwir4BaJxoaLKbcLrk9f90/5jPK',
      isVerifiedEmail: true,
      role: 'USER',
      province: 'LAMPUNG',
      address: 'KOTA BANDAR LAMPUNG',
    },
    user: {
      id: '57ea8afe-5576-11ee-8c99-0242ac120002',
      profileId: '5b360590-5575-11ee-8c99-0242ac120002',
      salaryExpectationId: 'b0c078fa-5576-11ee-8c99-0242ac120002',
      birthDate: '1998-09-15T00:00:00.000Z',
      gender: 'MALE',
      phoneNumber: '081234567890',
      headline: 'Frontend Developer',
      about: 'I am a frontend developer',
      resume:
        'https://firebasestorage.googleapis.com/v0/b/wihire-9f2cb.appspot.com/o/resume%2Fresume_miji.pdf?alt=media&token=d3ed784d-2198-4d8a-b49c-fffb70e664c9',
    },
  },
  {
    profile: {
      id: '5b360590-5575-11ee-8c99-0242ac120003',
      slug: 'rusdai-samudra-459f94b5',
      name: 'Rusdai Samudra',
      email: 'rusdai@gmail.com',
      password: '$2a$12$LTOi11NMa/0zkKYFJQKkl.PAIoMwir4BaJxoaLKbcLrk9f90/5jPK',
      isVerifiedEmail: true,
      role: 'USER',
      province: 'JAWA BARAT',
      address: 'KOTA BOGOR',
    },
    user: {
      id: '57ea8afe-5576-11ee-8c99-0242ac120003',
      profileId: '5b360590-5575-11ee-8c99-0242ac120003',
      salaryExpectationId: 'b0c078fa-5576-11ee-8c99-0242ac120003',
      birthDate: '1998-01-01T00:00:00.000Z',
      gender: 'MALE',
      phoneNumber: '081234567890',
      headline: 'Backend Developer',
      about: 'I am a backend developer',
      resume:
        'https://firebasestorage.googleapis.com/v0/b/wihire-9f2cb.appspot.com/o/resume%2Fresume_rusdai.pdf?alt=media&token=20b3d46e-a4d2-4035-bdb6-9a02fdbbb98c',
    },
  },
  {
    profile: {
      id: '5b360590-5575-11ee-8c99-0242ac120004',
      slug: 'nisa-putri-459f94b6',
      name: 'Nisa Putri',
      email: 'nisa20@gmail.com',
      password: '$2a$12$LTOi11NMa/0zkKYFJQKkl.PAIoMwir4BaJxoaLKbcLrk9f90/5jPK',
      isVerifiedEmail: true,
      role: 'USER',
      province: 'BANTEN',
      address: 'KOTA TANGERANG SELATAN',
    },
    user: {
      id: '57ea8afe-5576-11ee-8c99-0242ac120004',
      profileId: '5b360590-5575-11ee-8c99-0242ac120004',
      birthDate: '2000-01-25T00:00:00.000Z',
      gender: 'FEMALE',
      phoneNumber: '081234567890',
      headline: 'Frontend Developer',
      resume:
        'https://firebasestorage.googleapis.com/v0/b/wihire-9f2cb.appspot.com/o/resume%2F1.pdf?alt=media&token=e4486e8a-b109-46ce-a25e-79490f919779',
    },
  },
  {
    profile: {
      id: '5b360590-5575-11ee-8c99-0242ac120005',
      slug: 'wulan-alma-459f94b7',
      name: 'Wulan Alma',
      email: 'wulanalma@gmail.com',
      password: '$2a$12$LTOi11NMa/0zkKYFJQKkl.PAIoMwir4BaJxoaLKbcLrk9f90/5jPK',
      isVerifiedEmail: true,
      role: 'USER',
      province: 'BALI',
      address: 'KOTA BADUNG',
    },
    user: {
      id: '57ea8afe-5576-11ee-8c99-0242ac120005',
      profileId: '5b360590-5575-11ee-8c99-0242ac120005',
      birthDate: '2001-10-18T00:00:00.000Z',
      gender: 'FEMALE',
      phoneNumber: '081234567890',
    },
  },
];

const seedUser = async () => {
  await Promise.all(
    USERS.map(async ({ profile, user }) => {
      await prisma.profile.upsert({
        where: { id: profile.id },
        update: {},
        create: profile,
      });

      await prisma.user.upsert({
        where: { id: user.id },
        update: {},
        create: user,
      });
    }),
  );
};

module.exports = seedUser;
