const jwt = require('jsonwebtoken');

const { TOKEN_EXPIRED_ERR_MSG, TOKEN_INVALID_ERR_MSG } = require('../constants/errorMessage');
const { TOKEN_ERR } = require('../constants/errorType');
const InvariantError = require('../exceptions/InvariantError');

exports.createToken = ({ payload, secret, options }) => jwt.sign(payload, secret, options);

exports.decodeToken = (token, secretKey) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        if (error.message === 'jwt malformed') {
          reject(
            new InvariantError(TOKEN_INVALID_ERR_MSG, {
              type: TOKEN_ERR,
            }),
          );
        } else if (error.message === 'jwt expired') {
          reject(
            new InvariantError(TOKEN_EXPIRED_ERR_MSG, {
              type: TOKEN_ERR,
            }),
          );
        }

        reject(error);
      } else {
        resolve(decoded);
      }
    });
  });

exports.generateAccessToken = ({ id, email, role }) => {
  const accessToken = this.createToken({
    payload: { id, email, role },
    secret: process.env.ACCESS_TOKEN_SECRET_KEY,
    options: {
      expiresIn: '7d',
    },
  });

  return accessToken;
};

exports.generateVerifyEmailToken = ({ id, email }) => {
  const verifyEmailToken = this.createToken({
    payload: { id, email },
    secret: process.env.VERIFY_EMAIL_TOKEN_SECRET_KEY,
    options: {
      expiresIn: '3m',
    },
  });

  return verifyEmailToken;
};

exports.generateForgotPasswordToken = (payload) => {
  const forgotPasswordToken = this.createToken({
    payload,
    secret: process.env.VERIFY_FORGOT_PASSWORD_TOKEN_SECRET_KEY,
    options: {
      expiresIn: '5m',
    },
  });

  return forgotPasswordToken;
};
