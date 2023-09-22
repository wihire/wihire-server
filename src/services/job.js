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

  static #getJobsFilter = (filters) => {
    return {
      title: {
        contains: filters?.title,
        mode: 'insensitive',
      },
      company: {
        profile: {
          name: {
            contains: filters?.company,
            mode: 'insensitive',
          },
        },
      },
      categories: {
        some: {
          categories: {
            OR: filters?.categories?.map((category) => ({
              title: {
                contains: category,
                mode: 'insensitive',
              },
            })),
          },
        },
      },
      skills: {
        some: {
          skill: {
            OR: filters?.skills?.map((skill) => ({
              title: {
                contains: skill,
                mode: 'insensitive',
              },
            })),
          },
        },
      },
      status: {
        equals: filters?.status,
      },
      ...(filters?.['min-salary']
        ? {
            rangeSalary: {
              min: {
                gte: +filters.minSalary,
              },
            },
          }
        : {}),
      jobType: {
        in: filters?.['job-types'],
      },
      placeMethod: {
        in: filters?.['place-methods'],
      },
      ...(filters?.['is-saved'] === 'true'
        ? {
            savedJobs: {
              some: {
                userId: filters?.userId,
              },
            },
          }
        : {}),
    };
  };

  static getJobTotal = async (userId, filters) => {
    console.log(JobService.#getJobsFilter(filters));
    const totalJob = await prisma.job.count({
      where: {
        ...JobService.#getJobsFilter(filters),
      },
    });

    return totalJob;
  };

  static getAllJobs = async (userId, filters) => {
    const jobsRaw = await prisma.job.findMany({
      where: {
        ...JobService.#getJobsFilter(filters),
      },
      include: {
        company: {
          include: {
            profile: {
              select: {
                slug: true,
                name: true,
                email: true,
                avatar: true,
              },
            },
          },
        },
        rangeSalary: true,
        savedJobs: {
          where: {
            userId: {
              equals: userId,
            },
          },
        },
      },
    });

    const jobs = jobsRaw.map((job) => {
      const jobCompanyProfile = job.company.profile;
      const isSaved = job.savedJobs.length > 0;

      delete job.company;
      delete job.savedJobs;
      delete job.companyId;
      delete job.salaryId;
      delete job.description;
      delete job.minimumQualification;
      delete job.benefits;

      return {
        ...job,
        company: {
          profile: jobCompanyProfile,
        },
        isSaved,
      };
    });

    return jobs;
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
        company: {
          include: {
            profile: {
              select: {
                id: true,
                slug: true,
                name: true,
                email: true,
                avatar: true,
              },
            },
          },
        },
        rangeSalary: true,
      },
    });

    if (!job) {
      throw new NotFoundError('Job not found');
    }

    return job;
  };

  static saveJob = async ({ jobSlug, userId }) => {
    const job = await JobService.getBySlug(jobSlug);

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
    const job = await JobService.getBySlug(jobSlug);

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

  static deleteJob = async ({ jobSlug, companyId }) => {
    const job = await prisma.job.findFirst({
      where: {
        slug: jobSlug,
        companyId,
      },
    });

    if (!job) {
      throw new NotFoundError('Job not found at your company');
    }

    await prisma.job.delete({
      where: {
        slug: jobSlug,
        companyId,
      },
    });
  };
}

module.exports = JobService;
