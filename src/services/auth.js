const bcrypt = require('bcrypt');
const { uniqueSlug } = require('../lib/common');
const prisma = require('../lib/prisma');
const AuthtenticationError = require('../exceptions/AuthenticationError');
const { generateAccessToken } = require('../lib/tokenManager');
const ClientError = require('../exceptions/ClientError');
const { CONFLICT_ERR } = require('../constants/errorType');
const NotFoundError = require('../exceptions/NotFoundError');
const { NOT_FOUND_ERR } = require('../constants/errorType');
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
            salary: {
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
            salary: true,
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

    const getCompanyScope = await prisma.companyScope.upsert({
      where: {
        name: companyData.companyScope,
      },
      create: {
        name: companyData.companyScope,
      },
      update: {},
    });

    if (!getCompanyScope) {
      throw new NotFoundError('Company scope not found', {
        statusCode: 404,
        type: NOT_FOUND_ERR,
      });
    }

    const getCompanyTotalEmployee = await prisma.companyTotalEmployee.findUnique({
      where: {
        id: companyData.totalEmployee,
      },
    });

    if (!getCompanyTotalEmployee) {
      throw new NotFoundError('Company total employee not found', {
        statusCode: 404,
        type: NOT_FOUND_ERR,
      });
    }

    const newProfile = await prisma.profile.create({
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
                id: getCompanyScope.id,
              },
            },
            companyTotalEmployee: {
              connect: {
                id: getCompanyTotalEmployee.id,
              },
            },
          },
        },
      },
      include: {
        company: {
          include: {
            companyScope: true,
            companyTotalEmployee: true,
          },
        },
      },
    });

    return newProfile;
  };
}

module.exports = AuthService;
