const { successResponse } = require('../../lib/response');
const ProfileService = require('../../services/profile');
const ROLE = require('../../constants/role');
const ClodinaryStorage = require('../../lib/cloudinary/CloudinaryStorage');
const folderStorage = require('../../constants/folderStorage');
// const FirebaseStorage = require('../../lib/firebase/FirebaseStorage');

class ProfileController {
  static editProfileBySlug = async (req, res, next) => {
    try {
      const { userSlug } = req.params;
      const data = req.body;
      const { file } = req;

      const { secure_url } = await ClodinaryStorage.upload(file, {
        folder: folderStorage.cloudinary.AVATAR,
      });

      // const { url } = await FirebaseStorage.upload(file, {
      //   folder: folderStorage.firebase.RESUME,
      // });

      const profile = await ProfileService.updateProfile(userSlug, data, secure_url);

      return res
        .status(200)
        .json(successResponse({ message: 'Success update profile', data: profile }));
    } catch (error) {
      next(error);
    }
  };

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
