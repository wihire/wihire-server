const prisma = require('../lib/prisma');
const NotFoundError = require('../exceptions/NotFoundError');
const ROLE = require('../constants/role');

class ProfileService {
  static updateProfile = async (slug, updatedData, imageUrl) => {
    const isValid = await prisma.profile.findUnique({
      where: {
        slug,
      },
    });

    if (!isValid) {
      throw new NotFoundError('Profile not found');
    }

    const { role } = isValid;
    console.log(role);

    if (role === 'COMPANY') {
      const profileRaw = await prisma.profile.update({
        where: {
          slug,
        },
        data: {
          name: updatedData.name,
          email: updatedData.email,
          avatar: imageUrl,
          address: updatedData.address,
          company: {
            update: {
              headline: updatedData.headline,
              about: updatedData.about,
              websiteLink: updatedData.websiteLink,
              companyTotalEmployee: {
                update: {
                  total: updatedData.totalEmployee,
                },
              },
            },
          },
        },
        include: {
          company: {
            include: {
              companyTotalEmployee: true,
            },
          },
        },
      });
      let profile = {
        id: profileRaw.id,
        slug: profileRaw.slug,
      };
      return profile;
    }

    if (role === 'USER') {
      const profileRaw = await prisma.profile.update({
        where: {
          slug,
        },
        data: {
          name: updatedData.name,
          email: updatedData.email,
          avatar: imageUrl,
          address: updatedData.address,
          // resume: resumeUrl,
          user: {
            update: {
              gender: updatedData.gender,
              headline: updatedData.headline,
              about: updatedData.about,
              phoneNumber: updatedData.phoneNumber,
              birthDate: updatedData.birthDate,
              url: updatedData.url,
              salary: {
                update: {
                  min: +updatedData.salaryExpectationMin,
                  max: +updatedData.salaryExpectationMax,
                },
              },
              //butuh id
              // userEducations: {
              //   update: {
              //     name: updatedData.educationName,
              //     startDate: updatedData.educationStartDate,
              //     endDate: updatedData.educationEndDate,
              //      field: updatedData.educationField,
              //     grade: updatedData.educationGrade,
              //   },
              // },
              // userSkills: {
              //   update: {
              //     skillId: updatedData.skill,
              //     level: updatedData.skillLevel,
              //   },
              // },
              // userWorkExperiencies: {
              //   update: {
              //     companyName: updatedData.workExperienciesCompanyName,
              //     title: updatedData.userWorkExperienciesTitle,
              //     startDate: updatedData.userWorkExperienciesStartDate,
              //     endDate: updatedData.userWorkExperienciesEndDate,
              //     description: updatedData.userWorkExperienciesDescription,
              //   },
              // },
              // userProjects: {
              //   update: {
              //     name: updatedData.userProjectsName,
              //     role: updatedData.userProjectsRole,
              //     url: updatedData.userProjectsUrl,
              //     description: updatedData.userProjectsDescription,
              //     startDate: updatedData.userProjectsStartDate,
              //     endDate: updatedData.userProjectsEndDate,
              //   },
              // },
              // userCertificates: {
              //   update: {
              //     name: updatedData.userCertificatesName,
              //     organization: updatedData.userCertificatesOrganization,
              //     issueDate: updatedData.userCertificatesIssueDate,
              //     expiredDate: updatedData.userCertificatesExpiredDate,
              //   },
              // },
            },
          },
        },
        include: {
          user: {
            include: {
              userEducations: true,
              userSkills: true,
              userProjects: true,
            },
          },
        },
      });
      let profile = {
        id: profileRaw.id,
        slug: profileRaw.slug,
      };
      return profile;
    }
  };

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
