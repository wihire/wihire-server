const { getFileUri } = require('./file');

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.upload = async (file, folder) => {
  const fileUri = getFileUri(file);

  const options = {
    use_filename: true,
    unique_filename: true,
    folder,
  };

  const result = await cloudinary.uploader.upload(fileUri.content, options);

  return result;
};
