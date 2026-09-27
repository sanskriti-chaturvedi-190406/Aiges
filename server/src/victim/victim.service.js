/**
 * victim.service.js — Business logic for the Victim module.
 *
 * Sits between HTTP controllers and the data repository.
 * Knows nothing about HTTP or how data is stored.
 *
 * Rules enforced here:
 *   - IDs and timestamps always generated server-side
 *   - A victim may only cancel their OWN request
 *   - Resolved or already-Cancelled requests cannot be cancelled again
 *   - Profile fields are sanitised before storage
 */

const crypto = require('crypto')
const ApiError = require('../utils/ApiError')
const repo = require('./victim.repository')
const { buildInitialTimeline, REQUEST_STATUSES } = require('./victim.model')

function generateUUID() {
  return crypto.randomUUID ? crypto.randomUUID() : crypto.randomBytes(16).toString('hex')
}

function now() {
  return new Date().toISOString()
}

// ── Profile services ──────────────────────────────────────────────────────────

function registerVictim(data) {
  const timestamp = now()
  const profile = {
    id: `V-${generateUUID()}`,
    name: data.name.trim(),
    phone: data.phone.trim(),
    email: data.email ? data.email.trim().toLowerCase() : '',
    address: data.address.trim(),
    householdSize: Number(data.householdSize) || 1,
    accessibilityNeeds: data.accessibilityNeeds ? data.accessibilityNeeds.trim() : '',
    createdAt: timestamp,
    updatedAt: timestamp,
  }
  return repo.createProfile(profile)
}

function getVictimProfile(victimId) {
  const profile = repo.findProfileById(victimId)
  if (!profile) throw new ApiError(404, 'Victim profile not found')
  return profile
}

function updateVictimProfile(victimId, changes) {
  getVictimProfile(victimId) // confirms victim exists

  const sanitised = {}
  if (changes.name !== undefined)               sanitised.name = changes.name.trim()
  if (changes.phone !== undefined)              sanitised.phone = changes.phone.trim()
  if (changes.email !== undefined)              sanitised.email = changes.email.trim().toLowerCase()
  if (changes.address !== undefined)            sanitised.address = changes.address.trim()
  if (changes.householdSize !== undefined)      sanitised.householdSize = Number(changes.householdSize) || 1
  if (changes.accessibilityNeeds !== undefined) sanitised.accessibilityNeeds = changes.accessibilityNeeds.trim()
  sanitised.updatedAt = now()

  const updated = repo.updateProfile(victimId, sanitised)
  if (!updated) throw new ApiError(500, 'Profile update failed unexpectedly')
  return updated
}

// ── Request services ──────────────────────────────────────────────────────────

function createRequest(victimId, data) {
  getVictimProfile(victimId) // confirms victim exists

  const timestamp = now()
  const request = {
    id: `AE-${generateUUID().toUpperCase()}`,
    victimId,
    category: data.category,
    urgency: data.urgency,
    location: data.location.trim(),
    details: data.details.trim(),
    contact: data.contact ? data.contact.trim() : '',
    status: 'Submitted',
    timeline: buildInitialTimeline(timestamp),
    createdAt: timestamp,
    updatedAt: timestamp,
  }
  return repo.createRequest(request)
}

function getRequest(requestId) {
  const request = repo.findRequestById(requestId)
  if (!request) throw new ApiError(404, 'Request not found')
  return request
}

function listRequestsForVictim(victimId, options = {}) {
  getVictimProfile(victimId)

  const { status } = options
  if (status && !REQUEST_STATUSES.includes(status)) {
    throw new ApiError(400, `Invalid status filter. Must be one of: ${REQUEST_STATUSES.join(', ')}`)
  }

  const page = Math.max(1, Number(options.page) || 1)
  const limit = Math.min(100, Math.max(1, Number(options.limit) || 20))

  const result = repo.findRequestsByVictimId(victimId, { page, limit, status })
  return { ...result, page, limit }
}

function getRequestTimeline(requestId) {
  return getRequest(requestId).timeline
}

function cancelRequest(requestId, victimId) {
  const request = getRequest(requestId)

  if (request.victimId !== victimId)
    throw new ApiError(403, 'You do not have permission to cancel this request')
  if (request.status === 'Resolved')
    throw new ApiError(409, 'A resolved request cannot be cancelled')
  if (request.status === 'Cancelled')
    throw new ApiError(409, 'This request has already been cancelled')

  const cancelled = repo.cancelRequest(requestId)
  if (!cancelled) throw new ApiError(500, 'Cancellation failed unexpectedly')
  return cancelled
}

module.exports = {
  registerVictim,
  getVictimProfile,
  updateVictimProfile,
  createRequest,
  getRequest,
  listRequestsForVictim,
  getRequestTimeline,
  cancelRequest,
}
