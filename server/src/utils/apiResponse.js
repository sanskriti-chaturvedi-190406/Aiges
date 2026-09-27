function sendSuccess(res, data, status = 200) {
  res.status(status).json({ success: true, data })
}

function sendError(res, message, status = 500, details = null) {
  const body = { success: false, error: { message } }
  if (details !== null) body.error.details = details
  res.status(status).json(body)
}

module.exports = { sendSuccess, sendError }
