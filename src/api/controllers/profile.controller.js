const { successResponse } = require('../../lib/response');
const ProfileService = require('../../services/profile');
const ClodinaryStorage = require('../../lib/cloudinary/CloudinaryStorage');
const folderStorage = require('../../constants/folderStorage');
// const FirebaseStorage = require('../../lib/firebase/FirebaseStorage');

class ProfileController {
  static put = async (req, res, next) => {
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
      console.log(error);
      next(error);
    }
  };
}

module.exports = ProfileController;
