const { NOT_FOUND_ERR_MSG } = require('../constants/errorMessage')
const { NOT_FOUND_ERR } = require('../constants/errorType')

const ClientError = require('./ClientError')

class NotFoundError extends ClientError {
  name

  constructor(message = NOT_FOUND_ERR_MSG, options) {
    super(message, {
      type: options?.type ?? NOT_FOUND_ERR,
      statusCode: 404,
    })
    this.name = 'Not Found Error'
  }
}

module.exports = NotFoundError
