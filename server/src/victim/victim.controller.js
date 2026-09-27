const service = require('./victim.service')
const { sendSuccess } = require('../utils/apiResponse')

/** Wraps async handlers so rejections go to Express error pipeline */
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)

// ── Profile ───────────────────────────────────────────────────────────────────

/** POST /api/victim/register */
const registerVictim = asyncHandler(async (req, res) => {
  sendSuccess(res, service.registerVictim(req.body), 201)
})

/** GET /api/victim/profile/:victimId */
const getVictimProfile = asyncHandler(async (req, res) => {
  sendSuccess(res, service.getVictimProfile(req.params.victimId))
})

/** PATCH /api/victim/profile/:victimId */
const updateVictimProfile = asyncHandler(async (req, res) => {
  sendSuccess(res, service.updateVictimProfile(req.params.victimId, req.body))
})

// ── Requests ──────────────────────────────────────────────────────────────────

/** POST /api/victim/:victimId/requests */
const createRequest = asyncHandler(async (req, res) => {
  sendSuccess(res, service.createRequest(req.params.victimId, req.body), 201)
})

/** GET /api/victim/:victimId/requests?page&limit&status */
const listRequests = asyncHandler(async (req, res) => {
  sendSuccess(res, service.listRequestsForVictim(req.params.victimId, {
    page: req.query.page,
    limit: req.query.limit,
    status: req.query.status,
  }))
})

/** GET /api/victim/requests/:requestId */
const getRequest = asyncHandler(async (req, res) => {
  sendSuccess(res, service.getRequest(req.params.requestId))
})

/** GET /api/victim/requests/:requestId/timeline */
const getRequestTimeline = asyncHandler(async (req, res) => {
  sendSuccess(res, service.getRequestTimeline(req.params.requestId))
})

/** PATCH /api/victim/:victimId/requests/:requestId/cancel */
const cancelRequest = asyncHandler(async (req, res) => {
  sendSuccess(res, service.cancelRequest(req.params.requestId, req.params.victimId))
})

module.exports = {
  registerVictim,
  getVictimProfile,
  updateVictimProfile,
  createRequest,
  listRequests,
  getRequest,
  getRequestTimeline,
  cancelRequest,
}
