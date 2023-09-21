const slugify = require('slugify');
const { randomBytes } = require('crypto');

exports.uniqueSlug = (str) => {
  const slug = slugify(str);
  const uniqueId = randomBytes(4).toString('hex');

  return `${slug}-${uniqueId}`;
};

exports.isNumber = (value) => {
  return !isNaN(Number(value));
};
