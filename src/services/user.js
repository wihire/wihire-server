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
}

module.exports = UserService;
