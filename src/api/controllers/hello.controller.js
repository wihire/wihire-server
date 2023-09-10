const { successResponse } = require('../../lib/response')

class HelloController {
  static get = async (req, res, next) => {
    try {
      return res.status(200).json(
        successResponse({
          message: 'Hello World',
        }),
      )
    } catch (error) {
      next(error)
    }
  }
}

module.exports = HelloController
