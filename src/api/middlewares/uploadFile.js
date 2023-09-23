const multer = require('multer');

const InvariantError = require('../../exceptions/InvariantError');

/**
 * @description accept file format
 */
const fileFilter = (acceptedFormat) => (req, file, callback) => {
  if (acceptedFormat.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(new InvariantError('File format is not supported'));
  }
};

const uploadImage = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1 * 1024 * 1024, // 1mb
  },
  fileFilter: fileFilter(['image/png', 'image/jpg', 'image/jpeg']),
});

const uploadPDF = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5mb
  },
  fileFilter: fileFilter(['application/pdf']),
});

const upload = (type) => (engine, options) => (req, res, next) => {
  let uploadEngine;
  switch (type) {
    case 'image':
      uploadEngine = uploadImage;
      break;
    case 'pdf':
      uploadEngine = uploadPDF;
      break;
  }

  uploadEngine[engine](...options)(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
          next(new InvariantError('File you upload exceeds the maximum limit'));
        }
      }

      next(err);
    }

    next();
  });
};

module.exports = upload;
