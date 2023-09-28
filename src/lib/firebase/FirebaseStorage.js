const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const InvariantError = require('../../exceptions/InvariantError');
const { storage } = require('./config');

class FirebaseStorage {
  static upload = (file, { folder }) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve, reject) => {
      try {
        if (!file) {
          reject(new InvariantError('No file uploaded'));
        }

        const metadata = {
          contentType: file.mimetype,
        };

        const fileName = `${+Date.now()}-${file.originalname}`;
        const pathFileName = folder ? `${folder}/${fileName}` : fileName;
        const storageRef = ref(storage, pathFileName);

        const snapshot = await uploadBytes(storageRef, file.buffer, metadata);

        const url = await getDownloadURL(snapshot.ref);

        resolve({
          url,
          originalName: file.originalname,
          fileName,
        });
      } catch (error) {
        reject(error);
      }
    });
}

module.exports = FirebaseStorage;
