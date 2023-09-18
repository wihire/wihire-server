const ROLE = require('../../constants/role');
const AuthenticationError = require('../../exceptions/AuthenticationError');
const { decodeToken } = require('../../lib/tokenManager');
const CompanyService = require('../../services/company');
const UserService = require('../../services/user');

const authentication = async (req, res, next) => {
  try {
    const bearerToken = req.headers?.authorization;

    if (!bearerToken) {
      throw new AuthenticationError();
    }

    const token = bearerToken.split(' ')[1];

    const { id: profileId, role } = await decodeToken(token, process.env.ACCESS_TOKEN_SECRET_KEY);

    let user = null;
    if (role === ROLE.USER) {
      user = await UserService.getProfileUserByProfileId(profileId);
    } else if (role === ROLE.COMPANY) {
      user = await CompanyService.getProfileCompanyByProfileId(profileId);
    }

    if (!user) {
      throw new AuthenticationError();
    }

    delete user.password;
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
