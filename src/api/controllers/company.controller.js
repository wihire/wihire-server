const { successResponse } = require('../../lib/response');
const profileValidation = require('../../validations/profile');
const CompanyService = require('../../services/company');

class CompanyController {
  static editBasic = async (req, res, next) => {
    try {
      const profile = req.user;

      profileValidation.validateUpdateBasicProfileCompanyPayload(req.body);

      const profileUpdated = await CompanyService.updateBasic({
        profile,
        payload: {
          ...req.body,
          avatar: req.file,
        },
      });

      return res.status(200).json(
        successResponse({
          message: 'Success update basic profile',
          data: {
            user: {
              id: profileUpdated.company.id,
              slug: profileUpdated.slug,
              avatar: profileUpdated.avatar,
            },
          },
        }),
      );
    } catch (error) {
      next(error);
    }
  };
}

module.exports = CompanyController;
