const { AUTH_ERR_MSG } = require('../constants/errorMessage')
const { AUTHENTICATION_ERR } = require('../constants/errorType')

const ClientError = require('./ClientError')

class AuthenticationError extends ClientError {
  name

  constructor(message = AUTH_ERR_MSG, options) {
    super(message, {
      type: options?.type ?? AUTHENTICATION_ERR,
      statusCode: 401,
    })
    this.name = 'Authentication Error'
  }
}

module.exports = AuthenticationError
