const prisma = require('../lib/prisma');
const CloudinaryStorage = require('../lib/cloudinary/CloudinaryStorage');
const FirebaseStorage = require('../lib/firebase/FirebaseStorage');
const folderStorage = require('../constants/folderStorage');
const { uniqueSlug } = require('../lib/common');
const { Prisma } = require('@prisma/client');
const InvariantError = require('../exceptions/InvariantError');
const { CONFLICT_ERR } = require('../constants/errorType');

class UserService {
  static getProfileUserByProfileId = async (id) => {
    const user = await prisma.profile.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });

    return user;
  };

  static updateBasic = async ({ profile, payload }) => {
    try {
      let avatarUrl = undefined;

      if (payload?.avatar && payload?.deleteAvatar !== 'true') {
        ({ secure_url: avatarUrl } = await CloudinaryStorage.upload(payload.avatar, {
          folder: folderStorage.cloudinary.AVATAR,
        }));
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
          user: {
            update: {
              gender: payload?.gender,
              birthDate: payload?.birthDate,
              phoneNumber: payload?.phoneNumber,
              headline: payload?.headline ?? null,
              about: payload?.about ?? null,
              url: payload?.url ?? null,
            },
          },
        },
        include: {
          user: true,
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
  };

  static updateResume = async ({ profile, payload }) => {
    let resumeUrl = undefined;

    if (payload?.resume && payload?.deleteResume !== 'true') {
      ({ url: resumeUrl } = await FirebaseStorage.upload(payload.resume, {
        folder: folderStorage.firebaseStorage.RESUME,
      }));
    }

    await prisma.user.update({
      where: {
        id: profile.user.id,
      },
      data: {
        resume: payload.deleteResume === 'true' ? null : resumeUrl,
      },
    });
  };
}

module.exports = UserService;
