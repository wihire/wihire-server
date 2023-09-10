/* eslint-disable no-unused-vars */
const NotFoundError = require('../../exceptions/NotFoundError')
const { errorRes } = require('../../lib/response')

exports.notFound = (req, res, next) => {
  next(new NotFoundError())
}

exports.error = (err, req, res, next) => {
  return errorRes(res, err)
}
