const prisma = require('../lib/prisma');
const NotFoundError = require('../exceptions/NotFoundError');
const ROLE = require('../constants/role');

class ProfileService {
  static getProfileBySlug = async (slug) => {
    const profileRaw = await prisma.profile.findUnique({
      where: {
        slug,
      },
      include: {
        user: {
          include: {
            salaryExpectation: true,
            educations: {
              orderBy: {
                startDate: 'desc',
              },
            },
            skills: true,
            workExperiencies: {
              orderBy: {
                startDate: 'desc',
              },
            },
            projects: true,
            certificates: true,
          },
        },
        company: {
          include: {
            companyScope: true,
            totalEmployee: true,
          },
        },
      },
    });

    if (!profileRaw) {
      throw new NotFoundError('Profile not found');
    }

    delete profileRaw.password;

    const { role } = profileRaw;

    let profile;

    if (role === ROLE.COMPANY) {
      profile = {
        ...profileRaw,
        company: {
          ...profileRaw.company,
          companyScope: profileRaw.company.companyScope.name,
          totalEmployee: profileRaw.company.totalEmployee.total,
        },
      };

      delete profile.user;
      delete profile.company.companyTotalEmployee;
      delete profile.company.profileId;
      delete profile.company.companyScopeid;
      delete profile.company.companyTotalEmployeeId;
      delete profile.company.createdAt;
      delete profile.company.updatedAt;
    }

    if (role === ROLE.USER) {
      profile = {
        ...profileRaw,
        user: {
          ...profileRaw.user,
          salaryExpectation: profileRaw.user.salaryExpectation?.min ?? null,
          educations: profileRaw.user.educations.map((userEducation) => {
            delete userEducation.userId;

            return userEducation;
          }),
          skills: profileRaw.user.skills.map((userSkill) => {
            delete userSkill.userId;

            return userSkill;
          }),
          workExperiencies: profileRaw.user.workExperiencies.map((userWorkExperience) => {
            delete userWorkExperience.userId;

            return userWorkExperience;
          }),
          projects: profileRaw.user.projects.map((userProject) => {
            delete userProject.userId;

            return userProject;
          }),
          certificates: profileRaw.user.certificates.map((userCertificate) => {
            delete userCertificate.userId;

            return userCertificate;
          }),
        },
      };

      delete profile.company;
      delete profile.user.profileId;
      delete profile.user.salaryExpectationId;
      delete profile.user.birthDate;
      delete profile.user.createdAt;
      delete profile.user.updatedAt;
    }

    return profile;
  };
}

module.exports = ProfileService;
