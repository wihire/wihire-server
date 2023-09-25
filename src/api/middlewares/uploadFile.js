const multer = require('multer');

const InvariantError = require('../../exceptions/InvariantError');

/**
 * @description File size image = 1mb
 */
const FILE_SIZE_IMAGE = 1 * 1024 * 1024;
/**
 * @description File size pdf = 5mb
 */
const FILE_SIZE_PDF = 5 * 1024 * 1024;

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
    fileSize: FILE_SIZE_IMAGE,
  },
  fileFilter: fileFilter(['image/png', 'image/jpg', 'image/jpeg']),
});

const uploadPDF = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: FILE_SIZE_PDF,
  },
  fileFilter: fileFilter(['application/pdf']),
});

const upload = (type, multerConfig) => (engine, options) => (req, res, next) => {
  let uploadEngine;
  switch (type) {
    case 'image':
      uploadEngine = uploadImage;
      break;
    case 'pdf':
      uploadEngine = uploadPDF;
      break;
    default:
      uploadEngine = multer(multerConfig);
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

const multipleFields = (fields) => {
  const fieldsOptions = [...fields].map((field) => {
    const { name, maxCount } = field;

    return {
      name,
      maxCount,
    };
  });

  return upload(undefined, {
    storage: multer.memoryStorage(),
    fileFilter: (req, file, callback) => {
      const field = fields.find((field) => field.name === file.fieldname);

      switch (field.type) {
        case 'image':
          fileFilter(['image/png', 'image/jpg', 'image/jpeg'])(req, file, callback);
          break;
        case 'pdf':
          fileFilter(['application/pdf'])(req, file, callback);
          break;
      }

      callback(null, true);
    },
  })('fields', [fieldsOptions]);
};

module.exports = {
  upload,
  multipleFields,
};
