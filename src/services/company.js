const CloudinaryStorage = require('../lib/cloudinary/CloudinaryStorage');
const prisma = require('../lib/prisma');
const folderStorage = require('../constants/folderStorage');
const { uniqueSlug } = require('../lib/common');
const { Prisma } = require('@prisma/client');
const InvariantError = require('../exceptions/InvariantError');
const { CONFLICT_ERR } = require('../constants/errorType');
const NotFoundError = require('../exceptions/NotFoundError');

class CompanyService {
  static getProfileCompanyByProfileId = async (id) => {
    const company = await prisma.profile.findUnique({
      where: {
        id,
      },
      include: {
        company: true,
      },
    });

    return company;
  };

  static updateBasic = async ({ profile, payload }) => {
    return await prisma.$transaction(async (tx) => {
      try {
        let avatarUrl = undefined;

        if (payload?.avatar && payload?.deleteAvatar !== 'true') {
          ({ secure_url: avatarUrl } = await CloudinaryStorage.upload(payload.avatar, {
            folder: folderStorage.cloudinary.AVATAR,
          }));
        }

        const companyScope = await tx.companyScope.upsert({
          where: {
            name: payload.companyScope,
          },
          create: {
            name: payload.companyScope,
          },
          update: {},
        });

        const companyTotalEmployee = await tx.companyTotalEmployee.findUnique({
          where: {
            id: payload.totalEmployee,
          },
        });

        if (!companyTotalEmployee) {
          throw new NotFoundError('Company total employee not found');
        }

        const profileUpdated = await prisma.profile.update({
          where: {
            id: profile.id,
          },
          data: {
            name: payload.name,
            slug: profile.name !== payload.name ? uniqueSlug(payload.name) : undefined,
            email: payload.email,
            province: payload.province,
            address: payload.address,
            avatar: payload.deleteAvatar === 'true' ? null : avatarUrl,
            company: {
              update: {
                headline: payload?.headline ?? null,
                about: payload?.about ?? null,
                websiteLink: payload?.websiteLink ?? null,
                companyScope: {
                  connect: {
                    id: companyScope.id,
                  },
                },
                totalEmployee: {
                  connect: {
                    id: companyTotalEmployee.id,
                  },
                },
              },
            },
          },
          include: {
            company: true,
          },
        });

        return profileUpdated;
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new InvariantError('Email already exists', {
              statusCode: 409,
              type: CONFLICT_ERR,
            });
          }
        }

        throw error;
      }
    });
  };
}

module.exports = CompanyService;
