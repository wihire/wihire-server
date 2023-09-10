const { CLIENT_ERR_MSG } = require('../constants/errorMessage')
const { CLIENT_ERR } = require('../constants/errorType')

class ClientError extends Error {
  statusCode
  type

  constructor(message = CLIENT_ERR_MSG, options) {
    super(message)

    this.statusCode = options?.statusCode ?? 400
    this.type = options?.type ?? CLIENT_ERR
  }
}

module.exports = ClientError
