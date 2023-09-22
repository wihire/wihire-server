const InvariantError = require('../exceptions/InvariantError');
const NotFoundError = require('../exceptions/NotFoundError');
const { uniqueSlug } = require('../lib/common');
const prisma = require('../lib/prisma');

class JobService {
  static create = async (companyId, payload) => {
    return await prisma.$transaction(async (tx) => {
      const skills = await Promise.all(
        payload.skills.map(async (skill) => {
          return await tx.skill.upsert({
            where: {
              title: skill,
            },
            update: {},
            create: {
              title: skill,
            },
          });
        }),
      );

      const categories = await Promise.all(
        payload.categories.map(async (category) => {
          return await tx.category.upsert({
            where: {
              title: category,
            },
            update: {},
            create: {
              title: category,
            },
          });
        }),
      );

      const newJob = await tx.job.create({
        data: {
          company: {
            connect: {
              id: companyId,
            },
          },
          slug: uniqueSlug(payload.title),
          placeMethod: payload.placeMethod,
          jobType: payload.jobType,
          title: payload.title,
          province: payload.province,
          address: payload.address,
          description: payload.description,
          minimumQualification: payload.minimumQualification,
          benefit: payload.benefit,
          status: payload.status,
          rangeSalary: {
            create: {
              min: payload.minimalSalary,
              max: payload.maximalSalary,
            },
          },
        },
      });

      await tx.jobSkill.createMany({
        data: skills.map((skill) => ({
          skillId: skill.id,
          jobId: newJob.id,
        })),
      });

      await tx.jobCategory.createMany({
        data: categories.map((category) => ({
          categoryId: category.id,
          jobId: newJob.id,
        })),
      });

      return newJob;
    });
  };

  static update = async (jobSlug, payload) => {
    return await prisma.$transaction(async (tx) => {
      const jobSkill = await tx.job.findFirst({
        where: {
          slug: jobSlug,
        },
      });

      const jobCategories = await tx.job.findFirst({
        where: {
          slug: jobSlug,
        },
      });

      await tx.jobSkill.deleteMany({
        where: {
          jobId: {
            contains: jobSkill.id,
          },
        },
      });

      await tx.jobCategory.deleteMany({
        where: {
          jobId: {
            contains: jobCategories.id,
          },
        },
      });

      const skills = await Promise.all(
        payload.skills.map(async (skill) => {
          return await tx.skill.upsert({
            where: {
              title: skill,
            },
            update: {},
            create: {
              title: skill,
            },
          });
        }),
      );

      const categories = await Promise.all(
        payload.categories.map(async (category) => {
          return await tx.category.upsert({
            where: {
              title: category,
            },
            update: {},
            create: {
              title: category,
            },
          });
        }),
      );

      const salaary = await tx.job.findFirst({
        where: {
          slug: jobSlug,
        },
      });

      if (!salaary.salaryId) {
        const updateJob = await tx.job.update({
          where: {
            slug: jobSlug,
          },
          data: {
            placeMethod: payload.placeMethod,
            jobType: payload.jobType,
            title: payload.title,
            province: payload.province,
            address: payload.address,
            description: payload.description,
            minimumQualification: payload.minimumQualification,
            benefit: payload.benefit,
            status: payload.status,
            rangeSalary: {
              create: {
                min: payload.minimalSalary,
                max: payload.maximalSalary,
              },
            },
          },
        });

        await tx.jobSkill.createMany({
          data: skills.map((skill) => ({
            skillId: skill.id,
            jobId: updateJob.id,
          })),
        });

        await tx.jobCategory.createMany({
          data: categories.map((category) => ({
            categoryId: category.id,
            jobId: updateJob.id,
          })),
        });

        return updateJob;
      } else {
        await tx.salary.update({
          where: {
            id: salaary.salaryId,
          },

          data: {
            min: payload.minimalSalary,
            max: payload.maximalSalary,
          },
        });

        const updateJob = await tx.job.update({
          where: {
            slug: jobSlug,
          },
          data: {
            placeMethod: payload.placeMethod,
            jobType: payload.jobType,
            title: payload.title,
            province: payload.province,
            address: payload.address,
            description: payload.description,
            minimumQualification: payload.minimumQualification,
            benefit: payload.benefit,
            status: payload.status,
          },
        });

        await tx.jobSkill.createMany({
          data: skills.map((skill) => ({
            skillId: skill.id,
            jobId: updateJob.id,
          })),
        });

        await tx.jobCategory.createMany({
          data: categories.map((category) => ({
            categoryId: category.id,
            jobId: updateJob.id,
          })),
        });

        return updateJob;
      }
    });
  };

  static getSavedJob = async ({ jobId, userId }) => {
    const savedJob = await prisma.savedJob.findFirst({
      where: {
        jobId,
        userId,
      },
    });

    return savedJob;
  };

  static getBySlug = async (slug) => {
    const job = await prisma.job.findUnique({
      where: {
        slug,
      },
      include: {
        company: true,
        jobCategories: true,
        salary: true,
        jobSkills: true,
      },
    });

    return job;
  };

  static saveJob = async ({ jobSlug, userId }) => {
    const job = await prisma.job.findUnique({
      where: {
        slug: jobSlug,
      },
    });

    if (!job) {
      throw new NotFoundError('Job not found');
    }

    const savedJob = await JobService.getSavedJob({
      jobId: job.id,
      userId,
    });

    if (savedJob) {
      throw new InvariantError('You already save this job');
    }

    const newSavedJob = await prisma.savedJob.create({
      data: {
        jobId: job.id,
        userId,
      },
    });

    return newSavedJob;
  };

  static unsaveJob = async ({ jobSlug, userId }) => {
    const job = await prisma.job.findUnique({
      where: {
        slug: jobSlug,
      },
    });

    if (!job) {
      throw new NotFoundError('Job not found');
    }

    const savedJob = await JobService.getSavedJob({
      jobId: job.id,
      userId,
    });

    if (!savedJob) {
      throw new NotFoundError('Saved job not found');
    }

    await prisma.savedJob.delete({
      where: {
        id: savedJob.id,
      },
    });
  };
}

module.exports = JobService;
