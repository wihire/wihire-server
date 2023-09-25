const { Prisma } = require('@prisma/client');
const NotFoundError = require('../exceptions/NotFoundError');
const prisma = require('../lib/prisma');

class CertificateService {
  static getDetailCertificateUser = async ({ user, certificateId }) => {
    const userCertificate = await prisma.userCertificate.findFirst({
      where: {
        id: certificateId,
        userId: user.id,
      },
    });

    if (!userCertificate) {
      throw new NotFoundError('Certificate not found at your profile');
    }

    return userCertificate;
  };

  static createCertificateUser = async ({ user, payload }) => {
    await prisma.userCertificate.create({
      data: {
        name: payload.name,
        organization: payload.organization,
        issueDate: payload?.issueDate ?? null,
        expiredDate: payload?.expiredDate ?? null,
        credentialId: payload.credentialId,
        credentialUrl: payload?.credentialUrl ?? null,
        userId: user.id,
      },
    });
  };

  static updateCertificateUser = async ({ user, certificateId, payload }) => {
    try {
      await prisma.userCertificate.update({
        where: {
          id: certificateId,
          userId: user.id,
        },
        data: {
          name: payload.name,
          organization: payload.organization,
          issueDate: payload?.issueDate ?? null,
          expiredDate: payload?.expiredDate ?? null,
          credentialId: payload.credentialId,
          credentialUrl: payload?.credentialUrl ?? null,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError('Certificate not found at your profile');
        }
      }

      throw error;
    }
  };

  static deleteCertificateUser = async ({ user, certificateId }) => {
    try {
      await prisma.userCertificate.delete({
        where: {
          id: certificateId,
          userId: user.id,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError('Certificate not found at your profile');
        }
      }

      throw error;
    }
  };
}

module.exports = CertificateService;
