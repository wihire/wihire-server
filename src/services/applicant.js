const prisma = require('../lib/prisma');
const JobService = require('./job');
const STATUS_APPLICATION = require('../constants/statusApplication');
const UserService = require('./user');

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

  static getApplicantsDetails = async ({ jobSlug, userSlug }) => {
    const user = await UserService.getUserIdByProfileSlug(userSlug);
    // console.log(user,"<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
    // // const profile = await ProfileService.getProfileBySlug(userSlug);

    // delete profile.id;
    // delete profile.slug;
    // delete profile.role;
    // delete profile.isVerifiedEmail;
    // delete profile.createdAt;
    // delete profile.updatedAt;

    const job = await JobService.getBySlug(jobSlug);

    const application = await prisma.applicationList.findFirst({
      where: {
        AND: [
          {
            userId: user.user.id,
          },
          {
            jobId: job.id,
          },
        ],
      },
    });

    const applicantDetail = await prisma.applicationList.findUnique({
      where: {
        id: application.id,
      },
      include: {
        user: {
          include: {
            profile: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                // gender: true,
                address: true,
                // phoneNumber: true,
                // // headline: true,
                // about: true,
                // url: true,
              },
            },
            salaryExpectation: {
              select: {
                min: true,
              },
            },
            educations: true,
            skills: true,
            workExperiencies: {},
            projects: {},
            certificates: {},
          },
        },
      },
    });

    console.log(applicantDetail, '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');

    return applicantDetail;
  };
}

module.exports = ApplicantService;
