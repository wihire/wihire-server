const prisma = require('../lib/prisma');
const JobService = require('./job');
const STATUS_APPLICATION = require('../constants/statusApplication');
const NotFoundError = require('../exceptions/NotFoundError');
const ProfileService = require('./profile');
const ROLE = require('../constants/role');
const { sendEmail } = require('../lib/nodemailer');
const { emailApplicationStatus } = require('../constants/emailHtml');

class ApplicantService {
  static getApplicantsJob = async ({ jobSlug, companyId, filters }) => {
    const job = await JobService.getBySlug(jobSlug);

    if (job.company.id !== companyId) {
      throw new NotFoundError('Job not found at your company');
    }

    const applicationsJobRaw = await prisma.applicationList.findMany({
      where: {
        jobId: job.id,
        status: filters?.status,
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
                name: true,
                email: true,
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
      skip: (filters?.page - 1) * filters?.limit,
      take: filters?.limit,
      orderBy: {
        createdAt: 'desc',
      },
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

    const allApplicant = await prisma.applicationList.findMany({
      where: {
        jobId: job.id,
      },
      select: {
        user: {
          select: {
            profile: {
              select: {
                email: true,
              },
            },
          },
        },
      },
    });

    const applicantEmail = allApplicant.map((data) => ({
      email: data.user.profile.email,
    }));

    const stringApplicantEmail = applicantEmail.map((item) => item.email);

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

    await sendEmail({
      to: stringApplicantEmail,
      subject: 'Unfortunately!',
      // eslint-disable-next-line max-len
      html: emailApplicationStatus({
        callbackUrl: `http://localhost:3000/jobs/${job.slug}`,
        title: `Unfortunately! Your application at
        ${job.company.profile.name} as ${job.title} has been declined`,
        buttonText: 'Declined',
        description: `Don't be sad, there are still many job opportunities
        available at WiHire, keep it up!`,
      }),
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

    if (payload.status === STATUS_APPLICATION.APPROVED) {
      await sendEmail({
        to: profileUser.email,
        subject: 'Congratulations!',
        // eslint-disable-next-line max-len
        html: emailApplicationStatus({
          callbackUrl: `http://localhost:3000/jobs/${job.slug}`,
          title: `Congratulations! Your application at 
          ${job.company.profile.name} as ${job.title} has been Approved`,
          buttonText: 'Approved',
          description: 'For further information, please contact the company where you are applying',
        }),
      });
    }

    if (payload.status === STATUS_APPLICATION.DECLINE) {
      await sendEmail({
        to: profileUser.email,
        subject: 'Unfortunately!',
        // eslint-disable-next-line max-len
        html: emailApplicationStatus({
          callbackUrl: `http://localhost:3000/jobs/${job.slug}`,
          title: `Unfortunately! Your application at 
          ${job.company.profile.name} as ${job.title} has been declined`,
          buttonText: 'Declined',
          description: `Don't be sad, there are still many job opportunities 
          available at WiHire, keep it up!`,
        }),
      });
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
