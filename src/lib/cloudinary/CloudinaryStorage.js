const { getFileUri } = require('../file');
const cloudinary = require('./config');

class CloudinaryStorage {
  static upload = async (file, uploadOptions) => {
    const fileUri = getFileUri(file);

    const options = {
      use_filename: true,
      unique_filename: true,
      ...uploadOptions,
    };

    const result = await cloudinary.uploader.upload(fileUri.content, options);

    return result;
  };
}

module.exports = CloudinaryStorage;
