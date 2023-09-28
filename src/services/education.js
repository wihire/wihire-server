const { Prisma } = require('@prisma/client');
const NotFoundError = require('../exceptions/NotFoundError');
const prisma = require('../lib/prisma');

class EducationService {
  static getDetailEducationUser = async ({ user, educationId }) => {
    const education = await prisma.userEducation.findFirst({
      where: {
        id: educationId,
        userId: user.id,
      },
    });

    if (!education) {
      throw new NotFoundError('Education not found at your profile');
    }

    return education;
  };

  static createEducationUser = async ({ user, payload }) => {
    await prisma.userEducation.create({
      data: {
        name: payload.name,
        startDate: payload.startDate,
        endDate: payload.endDate,
        grade: payload?.grade,
        maxGrade: payload?.maxGrade,
        field: payload?.field,
        userId: user.id,
      },
    });
  };

  static updateEducationUser = async ({ user, educationId, payload }) => {
    try {
      await prisma.userEducation.update({
        where: {
          id: educationId,
          userId: user.id,
        },
        data: {
          name: payload.name,
          startDate: payload.startDate,
          endDate: payload.endDate,
          grade: payload?.grade ?? null,
          maxGrade: payload?.maxGrade ?? null,
          field: payload?.field ?? null,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError('Education not found at your profile');
        }
      }

      throw error;
    }
  };

  static deleteEducationUser = async ({ user, educationId }) => {
    try {
      await prisma.userEducation.delete({
        where: {
          id: educationId,
          userId: user.id,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError('Education not found at your profile');
        }
      }

      throw error;
    }
  };
}

module.exports = EducationService;
