import { useEffect, useState } from 'react'
import VictimDashboard from './victim/pages/VictimDashboard'
import VictimProfile from './victim/pages/VictimProfile'
import RequestHelp from './victim/pages/RequestHelp'
import RequestTracking from './victim/pages/RequestTracking'
import RequestHistory from './victim/pages/RequestHistory'
import NearbyAid from './victim/pages/NearbyAid'
import { listVictimRequests, saveVictimProfile, getVictimProfile, createVictimRequest } from './victim/services/victimRequests'
import './victim/victim.css'

const navigation = [
  { id: 'dashboard', label: 'Overview', icon: '⌂' },
  { id: 'request', label: 'Request help', icon: '+' },
  { id: 'tracking', label: 'Track request', icon: '↗' },
  { id: 'history', label: 'Request history', icon: '◷' },
  { id: 'nearby', label: 'Nearby aid', icon: '⌖' },
]

function App() {
  const [page, setPage] = useState('dashboard')
  const [profile, setProfile] = useState(getVictimProfile)
  const [requests, setRequests] = useState(listVictimRequests)
  const [selectedRequestId, setSelectedRequestId] = useState(null)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    if (!notice) return undefined
    const timeout = window.setTimeout(() => setNotice(''), 4000)
    return () => window.clearTimeout(timeout)
  }, [notice])

  function submitRequest(details) {
    try {
      const request = createVictimRequest(details)
      setRequests(listVictimRequests())
      setSelectedRequestId(request.id)
      setPage('tracking')
      setNotice('Your request is saved on this device. It has not been sent to a relief team.')
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'We could not save your request. Please try again.')
    }
  }

  function updateProfile(nextProfile) {
    try {
      saveVictimProfile(nextProfile)
      setProfile(nextProfile)
      setNotice('Your profile has been saved.')
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'We could not save your profile. Please try again.')
    }
  }

  const activeRequest = requests.find((request) => request.id === selectedRequestId) ?? requests[0] ?? null

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#dashboard" onClick={() => setPage('dashboard')} aria-label="Aegis home">
          <span className="brand-mark">A</span>
          <span>Aegis<span className="brand-subtitle">COMMUNITY RELIEF</span></span>
        </a>
        <div className="sidebar-label">YOUR SPACE</div>
        <nav className="side-nav" aria-label="Victim navigation">
          {navigation.map((item) => (
            <button
              className={`nav-link${page === item.id ? ' active' : ''}`}
              key={item.id}
              onClick={() => setPage(item.id)}
              type="button"
            >
              <span className="nav-icon" aria-hidden="true">{item.icon}</span>
              {item.label}
              {item.id === 'tracking' && activeRequest && <span className="nav-dot" />}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="safety-note"><span aria-hidden="true">♥</span><div><strong>You’re not alone.</strong><p>Help is nearby, and we’re here for you.</p></div></div>
          <button className="profile-shortcut" onClick={() => setPage('profile')} type="button">
            <span className="avatar">{profile.name?.trim()?.[0]?.toUpperCase() || 'Y'}</span>
            <span className="profile-shortcut-text"><strong>{profile.name || 'Your profile'}</strong><small>Personal details</small></span>
            <span className="shortcut-arrow" aria-hidden="true">›</span>
          </button>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="breadcrumb"><span>Victim portal</span><span aria-hidden="true">/</span><strong>{navigation.find((item) => item.id === page)?.label || 'Your profile'}</strong></div>
          <button className="top-profile" onClick={() => setPage('profile')} type="button">
            <span className="avatar avatar-small">{profile.name?.trim()?.[0]?.toUpperCase() || 'Y'}</span>
            <span>{profile.name || 'My profile'}</span>
          </button>
        </header>
        {notice && <div className="notice" role="status">{notice}<button type="button" onClick={() => setNotice('')} aria-label="Dismiss notification">×</button></div>}
        <div className="page-content">
          {page === 'dashboard' && <VictimDashboard requests={requests} profile={profile} onNavigate={setPage} />}
          {page === 'profile' && <VictimProfile profile={profile} onSave={updateProfile} />}
          {page === 'request' && <RequestHelp profile={profile} onSubmit={submitRequest} />}
          {page === 'tracking' && <RequestTracking request={activeRequest} onNavigate={setPage} />}
          {page === 'history' && <RequestHistory requests={requests} onTrack={(id) => { setSelectedRequestId(id); setPage('tracking') }} onNavigate={setPage} />}
          {page === 'nearby' && <NearbyAid />}
        </div>
        <footer className="site-footer"><span>Aegis community relief</span><span>In an immediate emergency, contact your local emergency services.</span></footer>
      </main>
    </div>
  )
}

export default App
