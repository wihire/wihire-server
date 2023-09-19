const { successResponse, clientErrorResponse } = require('../../lib/response');
const ProfileService = require('../../services/profile');

class ProfileController {
  static get = async (req, res, next) => {
    function exclude(profile, keys) {
      return Object.fromEntries(Object.entries(profile).filter(([key]) => !keys.includes(key)));
    }
    try {
      const { userSlug } = req.params;
      const profile = await ProfileService.getProfile(userSlug);

      if(!profile){
        res.status(404).json(
          clientErrorResponse({
            message: 'Profile not found',
          })
        );
      }
      
      const { role } = profile;
      const profileWithoutPassword = exclude(
        profile,
        role === 'COMPANY' ? ['password', 'user'] : ['password', 'company'],
      );
 

      if (role === 'COMPANY') {
        res.status(200).json(
          successResponse({
            message: 'Success get profile',
            data: {
              profile: profileWithoutPassword,
            },
          }),
        );
      }

      if (role === 'USER') {
        res.status(200).json(
          successResponse({
            message: 'Success get profile',
            data: {
              profile: profileWithoutPassword,
            },
          }),
        );
      }
     
     
    } catch (error) {
      next(error);
    }
  };
}

module.exports = ProfileController;
