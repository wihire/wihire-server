const bcrypt = require('bcrypt');

const prisma = require('../lib/prisma');
const AuthtenticationError = require('../exceptions/AuthenticationError');
const { generateAccessToken } = require('../lib/tokenManager');

class AuthService {
  static login = async ({ email, password }) => {
    const profile = await prisma.profile.findUnique({
      where: {
        email,
      },
    });

    if (!profile) {
      throw new AuthtenticationError('Email or password incorrect');
    }

    const isPasswordMatch = bcrypt.compareSync(password, profile.password);

    if (!isPasswordMatch) {
      throw new AuthtenticationError('Email or password incorrect');
    }

    const accessTokenPayload = {
      id: profile.id,
      email: profile.email,
      role: profile.role,
    };
    const accessToken = generateAccessToken(accessTokenPayload);

    return accessToken;
  };
}

module.exports = AuthService;
