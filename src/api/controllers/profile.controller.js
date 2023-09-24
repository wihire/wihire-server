const { successResponse } = require('../../lib/response');
const ProfileService = require('../../services/profile');
const ROLE = require('../../constants/role');

class ProfileController {
  static getBySlug = async (req, res, next) => {
    try {
      const { userSlug } = req.params;

      const profile = await ProfileService.getProfileBySlug(userSlug);
      delete profile.password;

      const { role } = profile;

      if (role === ROLE.COMPANY) {
        delete profile.user;
      }

      if (role === ROLE.USER) {
        delete profile.company;
      }

      return res.status(200).json(
        successResponse({
          message: 'Success get profile',
          data: {
            profile,
          },
        }),
      );
    } catch (error) {
      next(error);
    }
  };
}

module.exports = ProfileController;
