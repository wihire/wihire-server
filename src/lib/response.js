const { SERVER_ERR } = require('../constants/errorType')
const ClientError = require('../exceptions/ClientError')

const successResponse = ({
  message, // required for success response message
  data, // (optional) required for success response data (object, array, etc
  ...rest // (optional) required for success response additional data (pagination, etc)
}) => {
  if (data) {
    return {
      success: true,
      message,
      data,
      ...rest,
    }
  }

  return {
    success: true,
    message,
    ...rest,
  }
}

const clientErrorResponse = (error) => ({
  success: false,
  message: error.message,
  type: error.type,
})

const serverErrorResponse = (error) => ({
  success: false,
  message: error.message,
  type: SERVER_ERR,
  error: process.env.NODE_ENV !== 'production' ? error.stack : undefined,
})

const errorRes = (res, error) => {
  if (error instanceof ClientError) {
    return res.status(error.statusCode).json(clientErrorResponse(error))
  }

  return res.status(500).json(serverErrorResponse(error))
}

module.exports = {
  errorRes,
  clientErrorResponse,
  serverErrorResponse,
  successResponse,
}
