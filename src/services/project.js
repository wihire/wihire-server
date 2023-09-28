const { Prisma } = require('@prisma/client');
const NotFoundError = require('../exceptions/NotFoundError');
const prisma = require('../lib/prisma');

class ProjectService {
  static getDetailProjectUser = async ({ user, projectId }) => {
    const userProject = await prisma.userProject.findFirst({
      where: {
        id: projectId,
        userId: user.id,
      },
    });

    if (!userProject) {
      throw new NotFoundError('Project not found at your profile');
    }

    return userProject;
  };

  static createProjectUser = async ({ user, payload }) => {
    await prisma.userProject.create({
      data: {
        name: payload.name,
        role: payload.role ?? null,
        startDate: payload.startDate,
        endDate: payload.endDate,
        url: payload?.url ?? null,
        description: payload?.description ?? null,
        userId: user.id,
      },
    });
  };

  static updateProjectUser = async ({ user, projectId, payload }) => {
    try {
      await prisma.userProject.update({
        where: {
          id: projectId,
          userId: user.id,
        },
        data: {
          name: payload.name,
          role: payload.role ?? null,
          startDate: payload.startDate,
          endDate: payload.endDate,
          url: payload?.url ?? null,
          description: payload?.description ?? null,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError('Project not found at your profile');
        }
      }

      throw error;
    }
  };

  static deleteProjectUser = async ({ user, projectId }) => {
    try {
      await prisma.userProject.delete({
        where: {
          id: projectId,
          userId: user.id,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError('Project not found at your profile');
        }
      }

      throw error;
    }
  };
}

module.exports = ProjectService;
