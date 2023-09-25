const { Prisma } = require('@prisma/client');
const NotFoundError = require('../exceptions/NotFoundError');
const prisma = require('../lib/prisma');

class WorkExperience {
  static getDetailWorkExperienceUser = async ({ user, workExperienceId }) => {
    const userWorkExperience = await prisma.userWorkExperience.findFirst({
      where: {
        id: workExperienceId,
        userId: user.id,
      },
    });

    if (!userWorkExperience) {
      throw new NotFoundError('Work experience not found at your profile');
    }

    return userWorkExperience;
  };

  static createWorkExperienceUser = async ({ user, payload }) => {
    await prisma.userWorkExperience.create({
      data: {
        title: payload.title,
        companyName: payload.companyName,
        startDate: payload.startDate,
        endDate: payload.endDate ?? null,
        description: payload.description ?? null,
        userId: user.id,
      },
    });
  };

  static updateWorkExperienceUser = async ({ user, workExperienceId, payload }) => {
    try {
      await prisma.userWorkExperience.update({
        where: {
          id: workExperienceId,
          userId: user.id,
        },
        data: {
          title: payload.title,
          companyName: payload.companyName,
          startDate: payload.startDate,
          endDate: payload.endDate ?? null,
          description: payload.description ?? null,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError('Work experience not found at your profile');
        }
      }

      throw error;
    }
  };

  static deleteWorkExperienceUser = async ({ user, workExperienceId }) => {
    try {
      await prisma.userWorkExperience.delete({
        where: {
          id: workExperienceId,
          userId: user.id,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError('Work experience not found at your profile');
        }
      }

      throw error;
    }
  };
}

module.exports = WorkExperience;
