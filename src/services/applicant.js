const prisma = require('../lib/prisma');
const JobService = require('./job');
const STATUS_APPLICATION = require('../constants/statusApplication');
const ProfileService = require('./profile');
const NotFoundError = require('../exceptions/NotFoundError');

class ApplicantService {
  static getApplicantsJob = async ({ jobSlug, page, limit }) => {
    const job = await JobService.getBySlug(jobSlug);

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

  static rejectAllApplicants = async (jobSlug) => {
    const job = await JobService.getBySlug(jobSlug);

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

  static getApplicantDetails = async ({ companyId, jobSlug, userSlug }) => {
    const profileUser = await ProfileService.getProfileBySlug(userSlug);
    const job = await JobService.getBySlug(jobSlug);

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
      throw new NotFoundError('Applicant not found with this job');
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
