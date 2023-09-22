const prisma = require('../../src/lib/prisma');

const USER_SKILLS = [
  {
    id: 'b0c078fa-5576-11ee-8c99-0242ac131112',
    userId: '57ea8afe-5576-11ee-8c99-0242ac120002',
    skillId: '544e908a-54cb-11ee-8c99-0242ac120002',
    level: 'INTERMEDIATE',
  },
  {
    id: 'b0c078fa-5576-11ee-8c99-0242ac131113',
    userId: '57ea8afe-5576-11ee-8c99-0242ac120002',
    skillId: '544e908a-54cb-11ee-8c99-0242ac120004',
    level: 'BEGINNER',
  },
];

const seedUserSkill = async () => {
  await Promise.all(
    USER_SKILLS.map(async (userSkill) => {
      await prisma.userSkill.upsert({
        where: { id: userSkill.id },
        update: {},
        create: userSkill,
      });
    }),
  );
};

module.exports = seedUserSkill;
