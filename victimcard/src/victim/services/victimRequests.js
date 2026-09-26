const REQUESTS_KEY = 'aegis.victim.requests'
const PROFILE_KEY = 'aegis.victim.profile'

const defaultProfile = {
  name: '',
  phone: '',
  email: '',
  address: '',
  householdSize: '1',
  accessibilityNeeds: '',
}

function readStoredValue(key, fallback) {
  try {
    const stored = window.localStorage.getItem(key)
    return stored === null ? fallback : JSON.parse(stored)
  } catch (error) {
    console.error(`Unable to read ${key} from local storage.`, error)
    throw new Error('Saved information could not be loaded. Please check your browser storage settings.', { cause: error })
  }
}

function writeStoredValue(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Unable to save ${key} to local storage.`, error)
    throw new Error('Your changes could not be saved. Please check your browser storage settings and try again.', { cause: error })
  }
}

export function listVictimRequests() {
  const requests = readStoredValue(REQUESTS_KEY, [])
  if (!Array.isArray(requests)) {
    throw new Error('Saved requests are in an unexpected format. Clear browser storage to continue.')
  }
  return requests
}

export function getVictimProfile() {
  const profile = readStoredValue(PROFILE_KEY, defaultProfile)
  if (!profile || typeof profile !== 'object' || Array.isArray(profile)) {
    throw new Error('Saved profile is in an unexpected format. Clear browser storage to continue.')
  }
  return { ...defaultProfile, ...profile }
}

export function saveVictimProfile(profile) {
  writeStoredValue(PROFILE_KEY, { ...defaultProfile, ...profile })
}

export function createVictimRequest(details) {
  const now = new Date().toISOString()
  const request = {
    ...details,
    id: `AE-${(window.crypto?.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`).toUpperCase()}`,
    status: 'Submitted',
    createdAt: now,
    updatedAt: now,
    timeline: [
      { label: 'Request submitted', description: 'Your request has been received by the relief team.', timestamp: now, complete: true },
      { label: 'Team assigned', description: 'A response team will be assigned shortly.', timestamp: null, complete: false },
      { label: 'Help on the way', description: 'Your assigned team is travelling to your location.', timestamp: null, complete: false },
      { label: 'Support received', description: 'Your request has been fulfilled.', timestamp: null, complete: false },
    ],
  }
  writeStoredValue(REQUESTS_KEY, [request, ...listVictimRequests()])
  return request
}
