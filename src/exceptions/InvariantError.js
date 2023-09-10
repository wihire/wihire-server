const { INVARIANT_ERR_MSG } = require('../constants/errorMessage')
const { INVARIANT_ERR } = require('../constants/errorType')

const ClientError = require('./ClientError')

class InvariantError extends ClientError {
  name

  constructor(message = INVARIANT_ERR_MSG, options) {
    super(message, {
      type: options?.type ?? INVARIANT_ERR,
      statusCode: 400,
    })
    this.name = 'Invariant Error'
  }
}

module.exports = InvariantError
