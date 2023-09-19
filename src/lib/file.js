exports.getExtension = (file) => {
  const extension = file.originalname.split('.')[1];

  return extension;
};

exports.getFileUri = (file) => {
  const DatauriParser = require('datauri/parser');
  const parser = new DatauriParser();

  const fileUri = parser.format('.' + this.getExtension(file), file.buffer);

  return fileUri;
};
