/**
 * victim.model.js
 *
 * Single source of truth for all Victim module data shapes and enumerations.
 * The database team should mirror these fields exactly in their schema.
 *
 * @typedef {object} VictimProfile
 * @property {string}  id
 * @property {string}  name
 * @property {string}  phone
 * @property {string}  [email]
 * @property {string}  address
 * @property {number}  householdSize
 * @property {string}  [accessibilityNeeds]
 * @property {string}  createdAt   ISO 8601
 * @property {string}  updatedAt   ISO 8601
 *
 * @typedef {object} VictimRequest
 * @property {string}          id
 * @property {string}          victimId
 * @property {string}          category
 * @property {string}          urgency
 * @property {string}          location
 * @property {string}          details
 * @property {string}          [contact]
 * @property {string}          status
 * @property {TimelineEvent[]} timeline
 * @property {string}          createdAt
 * @property {string}          updatedAt
 *
 * @typedef {object} TimelineEvent
 * @property {string}      label
 * @property {string}      description
 * @property {string|null} timestamp
 * @property {boolean}     complete
 */

const REQUEST_CATEGORIES = Object.freeze([
  'Food & water',
  'Emergency shelter',
  'Medical support',
  'Rescue & evacuation',
  'Clothing & supplies',
  'Other',
])

const URGENCY_LEVELS = Object.freeze([
  'Whenever possible',
  'Within a few hours',
  'Immediate danger',
])

/**
 * Lifecycle statuses a request moves through.
 * Status is advanced by volunteer/admin modules — victim module only reads it.
 */
const REQUEST_STATUSES = Object.freeze([
  'Submitted',
  'Under review',
  'Assigned',
  'In progress',
  'Resolved',
  'Cancelled',
])

/**
 * Default four-step timeline for a newly created request.
 * @param {string} now  ISO 8601 timestamp
 * @returns {TimelineEvent[]}
 */
function buildInitialTimeline(now) {
  return [
    { label: 'Request submitted', description: 'Your request has been received.',                    timestamp: now,  complete: true  },
    { label: 'Team assigned',     description: 'A response team will be assigned shortly.',           timestamp: null, complete: false },
    { label: 'Help on the way',   description: 'Your assigned team is travelling to your location.', timestamp: null, complete: false },
    { label: 'Support received',  description: 'Your request has been fulfilled.',                   timestamp: null, complete: false },
  ]
}

module.exports = { REQUEST_CATEGORIES, URGENCY_LEVELS, REQUEST_STATUSES, buildInitialTimeline }
