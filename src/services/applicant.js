const prisma = require('../lib/prisma');
const JobService = require('./job');
const STATUS_APPLICATION = require('../constants/statusApplication');
const NotFoundError = require('../exceptions/NotFoundError');
const ProfileService = require('./profile');
const ROLE = require('../constants/role');

class ApplicantService {
  static getApplicantsJob = async ({ jobSlug, companyId, page, limit }) => {
    const job = await JobService.getBySlug(jobSlug);

    if (job.company.id !== companyId) {
      throw new NotFoundError('Job not found at your company');
    }

    const applicationsJobRaw = await prisma.applicationList.findMany({
      where: {
        jobId: job.id,
      },
      select: {
        user: {
          select: {
            id: true,
            salaryExpectation: {
              select: {
                min: true,
              },
            },
            gender: true,
            phoneNumber: true,
            profile: {
              select: {
                slug: true,
                avatar: true,
                province: true,
                address: true,
              },
            },
          },
        },
        resume: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    const applicationsJob = applicationsJobRaw.map((application) => ({
      ...application,
      user: {
        ...application.user,
        salaryExpectation: application.user.salaryExpectation?.min,
      },
    }));

    return applicationsJob;
  };

  static getApplicantTotal = async (jobSlug) => {
    const job = await JobService.getBySlug(jobSlug);

    const applicationsJob = await prisma.applicationList.count({
      where: {
        jobId: job.id,
      },
    });

    return applicationsJob;
  };

  static rejectAllApplicants = async (jobSlug, companyId) => {
    const job = await JobService.getBySlug(jobSlug);

    if (job.company.id !== companyId) {
      throw new NotFoundError('Job not found at your company');
    }

    const rejectedApplicant = await prisma.applicationList.updateMany({
      where: {
        jobId: job.id,
        NOT: [
          {
            OR: [
              {
                status: STATUS_APPLICATION.DECLINE,
              },
              {
                status: STATUS_APPLICATION.APPROVED,
              },
            ],
          },
        ],
      },
      data: {
        status: STATUS_APPLICATION.DECLINE,
      },
    });

    return rejectedApplicant;
  };

  static updateStatusApplicant = async ({ companyId, jobSlug, userSlug, payload }) => {
    const profileUser = await ProfileService.getProfileBySlug(userSlug);
    const job = await JobService.getBySlug(jobSlug);

    if (profileUser.role === ROLE.COMPANY) {
      throw new NotFoundError('Application not found at this job');
    }

    if (job.company.id !== companyId) {
      throw new NotFoundError('Job not found at your company');
    }

    const updatedApplication = await prisma.applicationList.updateMany({
      where: {
        userId: profileUser.user.id,
        jobId: job.id,
      },
      data: payload,
    });

    if (updatedApplication.count < 1) {
      throw new NotFoundError('Application not found at this job');
    }
  };

  static getApplicantDetails = async ({ companyId, jobSlug, userSlug }) => {
    const profileUser = await ProfileService.getProfileBySlug(userSlug);
    const job = await JobService.getBySlug(jobSlug);

    if (profileUser.role === ROLE.COMPANY) {
      throw new NotFoundError('Application not found at this job');
    }

    if (job.company.id !== companyId) {
      throw new NotFoundError('Job not found at your company');
    }

    const applicant = await prisma.applicationList.findFirst({
      where: {
        userId: profileUser.user.id,
        jobId: job.id,
      },
    });

    if (!applicant) {
      throw new NotFoundError('Applicant not found at this job');
    }

    const applicantDetail = {
      ...applicant,
      profile: profileUser,
    };

    delete applicantDetail.userId;
    delete applicantDetail.jobId;
    delete applicantDetail.profile.user.resume;

    return applicantDetail;
  };
}

module.exports = ApplicantService;
