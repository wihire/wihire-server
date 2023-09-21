const bcrypt = require('bcrypt');

const { uniqueSlug } = require('../lib/common');
const prisma = require('../lib/prisma');
const AuthtenticationError = require('../exceptions/AuthenticationError');
const {
  generateAccessToken,
  generateVerifyEmailToken,
  decodeToken,
} = require('../lib/tokenManager');
const ClientError = require('../exceptions/ClientError');
const { CONFLICT_ERR } = require('../constants/errorType');
const NotFoundError = require('../exceptions/NotFoundError');
const { NOT_FOUND_ERR } = require('../constants/errorType');
const { sendEmail } = require('../lib/nodemailer');

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

    return {
      accessToken,
      profile: {
        isVerifiedEmail: profile.isVerifiedEmail,
      },
    };
  };

  static registerUser = async (userData) => {
    const profile = await prisma.profile.findUnique({
      where: {
        email: userData.email,
      },
    });

    if (profile) {
      throw new ClientError('Email already exists', { statusCode: 409, type: CONFLICT_ERR });
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newProfile = await prisma.profile.create({
      data: {
        slug: uniqueSlug(userData.name),
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        role: 'USER',
        province: userData.province,
        address: userData.address,
        user: {
          create: {
            birthDate: userData.birthDate,
            gender: userData.gender,
            phoneNumber: userData.phoneNumber,
            salaryExpectation: {
              create: {
                min: userData.salaryExpectation,
              },
            },
          },
        },
      },
      include: {
        user: {
          include: {
            salaryExpectation: true,
          },
        },
      },
    });

    return newProfile;
  };

  static registerCompany = async (companyData) => {
    const profile = await prisma.profile.findUnique({
      where: {
        email: companyData.email,
      },
    });

    if (profile) {
      throw new ClientError('Email already exists', { statusCode: 409, type: CONFLICT_ERR });
    }

    const hashedPassword = await bcrypt.hash(companyData.password, 10);

    return await prisma.$transaction(async (tx) => {
      const companyScope = await tx.companyScope.upsert({
        where: {
          name: companyData.companyScope,
        },
        create: {
          name: companyData.companyScope,
        },
        update: {},
      });

      const companyTotalEmployee = await tx.companyTotalEmployee.findUnique({
        where: {
          id: companyData.totalEmployee,
        },
      });

      if (!companyTotalEmployee) {
        throw new NotFoundError('Company total employee not found', {
          statusCode: 404,
          type: NOT_FOUND_ERR,
        });
      }

      const newProfile = await tx.profile.create({
        data: {
          slug: uniqueSlug(companyData.name),
          name: companyData.name,
          email: companyData.email,
          password: hashedPassword,
          role: 'COMPANY',
          province: companyData.province,
          address: companyData.address,
          company: {
            create: {
              companyScope: {
                connect: {
                  id: companyScope.id,
                },
              },
            },
            totalEmployee: {
              connect: {
                id: companyTotalEmployee.id,
              },
            },
          },
        },
        include: {
          company: {
            include: {
              companyScope: true,
              totalEmployee: true,
            },
          },
        },
      });

      return newProfile;
    });
  };

  static verificationEmail = async ({ email }) => {
    const profile = await prisma.profile.findUnique({
      where: {
        email,
      },
    });

    if (!profile) {
      throw new NotFoundError('Account not found');
    }

    const verifyEmailPayload = {
      id: profile.id,
      email: profile.email,
    };

    const verifyEmailToken = generateVerifyEmailToken(verifyEmailPayload);

    await sendEmail({
      to: email,
      subject: 'Email Verification',
      // eslint-disable-next-line max-len
      text: `Please verify your email: http://localhost:3000/auth/verify-email?token=${verifyEmailToken}`,
    });
  };

  static verifyEmail = async ({ token }) => {
    const data = await decodeToken(token, process.env.VERIFY_EMAIL_TOKEN_SECRET_KEY);

    const profile = await prisma.profile.update({
      where: {
        id: data.id,
      },
      data: {
        isVerifiedEmail: true,
      },
    });

    const accessTokenPayload = {
      id: profile.id,
      email: profile.email,
      role: profile.role,
    };

    const accessToken = generateAccessToken(accessTokenPayload);

    return {
      accessToken,
      profile: {
        isVerifiedEmail: profile.isVerifiedEmail,
      },
    };
  };
}

module.exports = AuthService;
