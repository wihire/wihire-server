const { CONFLICT_ERR } = require('../constants/errorType');
const ClientError = require('../exceptions/ClientError');
const InvariantError = require('../exceptions/InvariantError');
const NotFoundError = require('../exceptions/NotFoundError');
const prisma = require('../lib/prisma');

class JobService {
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

  static unsaveJob = async ({ jobSlug, jobId, userId }) => {
    const job = await prisma.job.findUnique({
      where: {
        id: jobId,
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

  static applyJob = async ({ jobSlug, jobId, userId, url }) => {
    const job = await prisma.job.findUnique({
      where: {
        slug: jobSlug,
      },
    });

    console.log(job);

    if (!job) {
      throw new NotFoundError('Job not found');
    }

    const applicantCheck = await prisma.applicationList.findFirst({
      where: {
        user: {
          id: userId,
        },
        job: {
          id: jobId,
        },
      },
    });

    if (applicantCheck) {
      throw new ClientError('Already Apply This Job', { statusCode: 409, type: CONFLICT_ERR });
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
}

module.exports = JobService;
