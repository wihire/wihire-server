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

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  };
}

module.exports = UserService;
