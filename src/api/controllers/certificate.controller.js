const { successResponse } = require('../../lib/response');
const userValidation = require('../../validations/user');
const CertificateService = require('../../services/certificate');

class CertificateController {
  static getDetailCertificate = async (req, res, next) => {
    try {
      const profile = req.user;

      const certificate = await CertificateService.getDetailCertificateUser({
        user: profile.user,
        certificateId: req.params.certificateId,
      });

      return res.status(200).json(
        successResponse({
          message: 'Success get detail certificate',
          data: {
            certificate,
          },
        }),
      );
    } catch (error) {
      next(error);
    }
  };

  static createCertificate = async (req, res, next) => {
    try {
      const profile = req.user;

      userValidation.validateCreateCertificatePayload(req.body);

      await CertificateService.createCertificateUser({
        user: profile.user,
        payload: req.body,
      });

      return res.status(201).json(
        successResponse({
          message: 'Success create certificate',
        }),
      );
    } catch (error) {
      next(error);
    }
  };

  static updateCertificate = async (req, res, next) => {
    try {
      const profile = req.user;

      userValidation.validateUpdateCertificatePayload(req.body);

      await CertificateService.updateCertificateUser({
        user: profile.user,
        certificateId: req.params.certificateId,
        payload: req.body,
      });

      return res.status(200).json(
        successResponse({
          message: 'Success update certificate',
        }),
      );
    } catch (error) {
      next(error);
    }
  };

  static deleteCertificate = async (req, res, next) => {
    try {
      const profile = req.user;

      await CertificateService.deleteCertificateUser({
        user: profile.user,
        certificateId: req.params.certificateId,
      });

      return res.status(200).json(
        successResponse({
          message: 'Success delete certificate',
        }),
      );
    } catch (error) {
      next(error);
    }
  };
}

module.exports = CertificateController;
