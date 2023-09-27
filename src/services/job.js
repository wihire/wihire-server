const { CONFLICT_ERR } = require('../constants/errorType');
const InvariantError = require('../exceptions/InvariantError');
const NotFoundError = require('../exceptions/NotFoundError');
const { uniqueSlug } = require('../lib/common');
const FirebaseStorage = require('../lib/firebase/FirebaseStorage');
const folderStorage = require('../constants/folderStorage');
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
          description: payload?.description,
          minimumQualification: payload?.minimumQualification,
          benefits: payload?.benefits,
          status: payload?.status,
          ...(payload?.minimalSalary
            ? {
                rangeSalary: {
                  create: {
                    min: payload.minimalSalary,
                    max: payload?.maximalSalary,
                  },
                },
              }
            : {}),
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
      const job = await tx.job.findFirst({
        where: {
          slug: jobSlug,
        },
      });

      if (!job) {
        throw new NotFoundError('Job not found');
      }

      await tx.jobSkill.deleteMany({
        where: {
          jobId: job.id,
        },
      });

      await tx.jobCategory.deleteMany({
        where: {
          jobId: job.id,
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

      const jobHasRangeSalary = job?.salaryId;
      const deleteRangeSalary = jobHasRangeSalary && !payload?.minimalSalary;
      let salaryQuery = {};
      if (deleteRangeSalary) {
        salaryQuery = {
          rangeSalary: {
            disconnect: true,
          },
        };
      } else if (!jobHasRangeSalary && payload?.minimalSalary) {
        salaryQuery = {
          rangeSalary: {
            create: {
              min: payload.minimalSalary,
              max: payload?.maximalSalary,
            },
          },
        };
      } else if (jobHasRangeSalary && payload?.minimalSalary) {
        salaryQuery = {
          rangeSalary: {
            update: {
              min: payload.minimalSalary,
              max: payload?.maximalSalary ?? null,
            },
          },
        };
      }

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
          description: payload?.description ?? null,
          minimumQualification: payload?.minimumQualification ?? null,
          benefits: payload?.benefits ?? null,
          status: payload?.status ?? null,
          ...salaryQuery,
        },
      });

      if (deleteRangeSalary) {
        await tx.salary.delete({
          where: {
            id: job.salaryId,
          },
        });
      }

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
    });
  };

  static #getJobsFilter = (userId, filters) => {
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
          category: {
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
                gte: +filters['min-salary'],
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
      ...((filters?.['is-saved'] === 'true') | (filters?.['is-saved'] === 'false')
        ? {
            savedJobs: {
              ...(filters?.['is-saved'] === 'true' ? { some: { userId } } : {}),
              ...(filters?.['is-saved'] === 'false' ? { none: { userId } } : {}),
            },
          }
        : {}),
    };
  };

  static getJobTotal = async (userId, filters) => {
    const totalJob = await prisma.job.count({
      where: {
        ...JobService.#getJobsFilter(userId, filters),
      },
    });

    return totalJob;
  };

  static simpleJobMapping = (job) => {
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
  };

  static getAllJobs = async (userId, filters) => {
    const jobsRaw = await prisma.job.findMany({
      where: {
        ...JobService.#getJobsFilter(userId, filters),
      },
      skip: (filters.page - 1) * filters.limit,
      take: filters.limit,
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

    const jobs = jobsRaw.map(this.simpleJobMapping);

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
        skills: {
          include: {
            skill: true,
          },
        },
        categories: {
          include: {
            category: true,
          },
        },
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

  static applyJob = async ({ jobSlug, userId, file, resumeUrl }) => {
    const job = await JobService.getBySlug(jobSlug);

    const applicantCheck = await prisma.applicationList.findFirst({
      where: {
        user: {
          id: userId,
        },
        job: {
          id: job.id,
        },
      },
    });

    if (applicantCheck) {
      throw new InvariantError('Already Apply This Job', { statusCode: 409, type: CONFLICT_ERR });
    }

    let url = resumeUrl;
    if (file) {
      ({ url } = await FirebaseStorage.upload(file, {
        folder: folderStorage.firebaseStorage.RESUME,
      }));
    }

    const applyJob = await prisma.applicationList.create({
      data: {
        resume: url,
        user: {
          connect: {
            id: userId,
          },
        },
        job: {
          connect: {
            id: job.id,
          },
        },
      },
    });

    return applyJob;
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

  static getJobDetailBySlug = async ({ jobSlug, userId }) => {
    const jobRaw = await JobService.getBySlug(jobSlug);
    const savedJob = await JobService.getSavedJob({
      jobId: jobRaw.id,
      userId,
    });

    const jobCompanyProfile = jobRaw.company.profile;
    const jobSkills = jobRaw.skills.map((skill) => skill.skill.title);
    const jobCategories = jobRaw.categories.map((category) => category.category.title);

    delete jobRaw.company;
    delete jobRaw.companyId;
    delete jobRaw.salaryId;
    delete jobRaw.skills;
    delete jobRaw.categories;

    const job = {
      ...jobRaw,
      company: {
        profile: jobCompanyProfile,
      },
      skills: jobSkills,
      categories: jobCategories,
      isSaved: !!savedJob,
    };

    return job;
  };
}

module.exports = JobService;
