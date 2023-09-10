const { FORBIDDEN_ERR_MSG } = require('../constants/errorMessage')
const { FORBIDDEN_ERR } = require('../constants/errorType')

const ClientError = require('./ClientError')

class ForbiddenError extends ClientError {
  name

  constructor(message = FORBIDDEN_ERR_MSG, options) {
    super(message, {
      type: options?.type ?? FORBIDDEN_ERR,
      statusCode: 403,
    })
    this.name = 'Forbidden Error'
  }
}

module.exports = ForbiddenError
