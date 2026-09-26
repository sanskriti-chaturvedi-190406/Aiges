import RequestCard from '../components/RequestCard'

function VictimDashboard({ requests, profile, onNavigate }) {
  const activeRequests = requests.filter((request) => request.status !== 'Resolved' && request.status !== 'Cancelled')
  const latestRequest = requests[0]

  return (
    <div className="page-stack">
      <section className="welcome-row">
        <div><p className="eyebrow">YOUR COMMUNITY RELIEF PORTAL</p><h1>{profile.name ? `Hello, ${profile.name.split(' ')[0]}.` : 'We’re here to help.'}</h1><p className="page-intro">Record the support you need and keep your information together in one place.</p></div>
        <button className="primary-button" onClick={() => onNavigate('request')} type="button"><span aria-hidden="true">＋</span> Request help</button>
      </section>

      <section className="hero-panel">
        <div className="hero-panel-copy"><span className="hero-label"><span className="pulse-dot" /> YOUR SUPPORT PORTAL</span><h2>One step at a time.<br />You don’t have to keep it all in your head.</h2><p>Save the help you need, keep track of details, and find verified local aid when a directory is connected.</p><button className="light-button" type="button" onClick={() => onNavigate('request')}>Record a request <span aria-hidden="true">→</span></button></div>
        <div className="hero-art" aria-hidden="true"><div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" /><div className="hero-sun">✦</div><div className="hero-cross">+</div><div className="hero-ground" /><div className="hero-home"><span /><i /></div></div>
      </section>

      <section className="stat-grid" aria-label="Your request summary">
        <article className="stat-card"><span className="stat-icon active-stat">↗</span><div><span>Saved requests</span><strong>{activeRequests.length}</strong></div><small>Stored on this device</small></article>
        <article className="stat-card"><span className="stat-icon complete-stat">✓</span><div><span>Requests completed</span><strong>{requests.filter((request) => request.status === 'Resolved').length}</strong></div><small>Support received</small></article>
        <article className="stat-card"><span className="stat-icon nearby-stat">⌖</span><div><span>Nearby support</span><strong>Explore</strong></div><small>Find aid around you</small><button className="stat-link" type="button" onClick={() => onNavigate('nearby')}>View nearby aid →</button></article>
      </section>

      <section className="section-block">
        <div className="section-heading"><div><p className="eyebrow">STAY IN THE LOOP</p><h2>Your latest request</h2></div>{requests.length > 0 && <button className="text-button" type="button" onClick={() => onNavigate('history')}>View all requests <span aria-hidden="true">→</span></button>}</div>
        {latestRequest ? <RequestCard request={latestRequest} onTrack={() => onNavigate('tracking')} /> : <div className="empty-card"><span className="empty-icon" aria-hidden="true">♡</span><h3>No requests yet</h3><p>If you need food, shelter, medical care, or other support, we’re ready to help.</p><button className="secondary-button" type="button" onClick={() => onNavigate('request')}>Make your first request</button></div>}
      </section>

      <section className="quick-links"><button type="button" onClick={() => onNavigate('nearby')}><span className="quick-icon">⌖</span><span><strong>Find nearby aid</strong><small>Shelters and relief stations</small></span><span className="quick-arrow">→</span></button><button type="button" onClick={() => onNavigate('profile')}><span className="quick-icon profile-quick">♙</span><span><strong>Update your details</strong><small>Help teams reach you faster</small></span><span className="quick-arrow">→</span></button></section>
    </div>
  )
}

export default VictimDashboard
