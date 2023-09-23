const { NOT_FOUND_ERR } = require('../constants/errorType');
const NotFoundError = require('../exceptions/NotFoundError');
const prisma = require('../lib/prisma');

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

  static getUserIdByProfileSlug = async (slug) => {
    const user = await prisma.profile.findUnique({
      where: {
        slug,
      },
      include: {
        user: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundError('User not found', { type: NOT_FOUND_ERR });
    }

    return user;
  };
}

module.exports = UserService;
