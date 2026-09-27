/**
 * victim.routes.js — All routes prefixed /api/victim (set in app.js)
 *
 * POST   /register
 * GET    /profile/:victimId
 * PATCH  /profile/:victimId
 * GET    /requests/:requestId/timeline
 * GET    /requests/:requestId
 * POST   /:victimId/requests
 * GET    /:victimId/requests
 * PATCH  /:victimId/requests/:requestId/cancel
 *
 * TODO — Auth: when auth middleware is ready, add it to each route:
 *   const { requireAuth } = require('../middleware/auth')
 *   router.get('/profile/:victimId', requireAuth, controller.getVictimProfile)
 */

const { Router } = require('express')
const controller = require('./victim.controller')
const validate = require('../middleware/validate')
const { registerVictimSchema, updateProfileSchema, createRequestSchema } = require('./victim.validation')

const router = Router()

// ── Profile ───────────────────────────────────────────────────────────────────
router.post('/register',           validate(registerVictimSchema), controller.registerVictim)
router.get('/profile/:victimId',                                   controller.getVictimProfile)
router.patch('/profile/:victimId', validate(updateProfileSchema),  controller.updateVictimProfile)

// ── Requests ──────────────────────────────────────────────────────────────────
// Specific /requests/:id routes BEFORE /:victimId to avoid param conflicts
router.get('/requests/:requestId/timeline', controller.getRequestTimeline)
router.get('/requests/:requestId',          controller.getRequest)

router.post('/:victimId/requests',                    validate(createRequestSchema), controller.createRequest)
router.get('/:victimId/requests',                                                    controller.listRequests)
router.patch('/:victimId/requests/:requestId/cancel',                                controller.cancelRequest)

module.exports = router
