const { sendError } = require('../utils/apiResponse')
const ApiError = require('../utils/ApiError')

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  if (err instanceof ApiError) {
    return sendError(res, err.message, err.statusCode, err.details)
  }
  console.error('[Unhandled error]', err)
  return sendError(res, 'An unexpected error occurred. Please try again later.', 500)
}

module.exports = errorHandler
