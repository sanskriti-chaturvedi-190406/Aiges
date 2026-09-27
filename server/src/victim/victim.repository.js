/**
 * victim.repository.js — In-memory data access layer (placeholder).
 *
 * ═══════════════════════════════════════════════════════════════
 *  TO SWAP IN A REAL DATABASE:
 *  1. Create  server/src/victim/victim.repository.mongo.js
 *  2. Export the exact same function names listed at the bottom
 *  3. In victim.service.js, change:
 *       const repo = require('./victim.repository')
 *     to:
 *       const repo = require('./victim.repository.mongo')
 *  Nothing else needs to change.
 * ═══════════════════════════════════════════════════════════════
 */

/** @type {Map<string, import('./victim.model').VictimProfile>} */
const profiles = new Map()

/** @type {Map<string, import('./victim.model').VictimRequest>} */
const requests = new Map()

// ── Profiles ──────────────────────────────────────────────────────────────────

function createProfile(profile) {
  profiles.set(profile.id, profile)
  return profile
}

function findProfileById(id) {
  return profiles.get(id) ?? null
}

function updateProfile(id, changes) {
  const existing = profiles.get(id)
  if (!existing) return null
  const updated = { ...existing, ...changes, id }
  profiles.set(id, updated)
  return updated
}

// ── Requests ──────────────────────────────────────────────────────────────────

function createRequest(request) {
  requests.set(request.id, request)
  return request
}

function findRequestById(id) {
  return requests.get(id) ?? null
}

/**
 * @param {string} victimId
 * @param {{ page?: number, limit?: number, status?: string }} [options]
 * @returns {{ requests: object[], total: number }}
 */
function findRequestsByVictimId(victimId, options = {}) {
  const { page = 1, limit = 20, status } = options

  let all = [...requests.values()].filter((r) => r.victimId === victimId)
  if (status) all = all.filter((r) => r.status === status)
  all.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  const total = all.length
  const paginated = all.slice((page - 1) * limit, page * limit)
  return { requests: paginated, total }
}

function updateRequest(id, changes) {
  const existing = requests.get(id)
  if (!existing) return null
  const updated = { ...existing, ...changes, id }
  requests.set(id, updated)
  return updated
}

function cancelRequest(id) {
  return updateRequest(id, { status: 'Cancelled', updatedAt: new Date().toISOString() })
}

module.exports = {
  createProfile,
  findProfileById,
  updateProfile,
  createRequest,
  findRequestById,
  findRequestsByVictimId,
  updateRequest,
  cancelRequest,
}
