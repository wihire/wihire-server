const NotFoundError = require('../exceptions/NotFoundError');
const prisma = require('../lib/prisma');

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
}
module.exports = ProfileService;
