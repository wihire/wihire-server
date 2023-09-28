const { Prisma } = require('@prisma/client');
const NotFoundError = require('../exceptions/NotFoundError');
const prisma = require('../lib/prisma');

class SkillService {
  static getDetailSkillUser = async ({ user, skillId }) => {
    const userSkillRaw = await prisma.userSkill.findFirst({
      where: {
        id: skillId,
        userId: user.id,
      },
      include: {
        skill: true,
      },
    });

    if (!userSkillRaw) {
      throw new NotFoundError('Skill not found at your profile');
    }

    const userSkill = {
      ...userSkillRaw,
      title: userSkillRaw.skill.title,
    };

    delete userSkill.skill;

    return userSkill;
  };

  static createSkillUser = async ({ user, payload }) => {
    await prisma.$transaction(async (tx) => {
      const skill = await tx.skill.upsert({
        where: {
          title: payload.skill,
        },
        create: {
          title: payload.skill,
        },
        update: {},
      });

      await tx.userSkill.create({
        data: {
          skillId: skill.id,
          level: payload.level,
          userId: user.id,
        },
      });
    });
  };

  static updateSkillUser = async ({ user, skillId, payload }) => {
    await prisma.$transaction(async (tx) => {
      try {
        const skill = await tx.skill.upsert({
          where: {
            title: payload.skill,
          },
          create: {
            title: payload.skill,
          },
          update: {},
        });

        await tx.userSkill.update({
          where: {
            id: skillId,
            userId: user.id,
          },
          data: {
            skillId: skill.id,
            level: payload.level,
          },
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2025') {
            throw new NotFoundError('Skill not found at your profile');
          }
        }

        throw error;
      }
    });
  };

  static deleteSkillUser = async ({ user, skillId }) => {
    try {
      await prisma.userSkill.delete({
        where: {
          id: skillId,
          userId: user.id,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError('Skill not found at your profile');
        }
      }

      throw error;
    }
  };
}

module.exports = SkillService;
