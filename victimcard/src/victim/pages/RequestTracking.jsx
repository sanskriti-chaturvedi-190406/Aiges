import RequestCard from '../components/RequestCard'
import RequestTimeline from '../components/RequestTimeline'

function RequestTracking({ request, onNavigate }) {
  if (!request) {
    return <div className="page-stack"><section className="page-heading"><p className="eyebrow">REQUEST UPDATES</p><h1>Track your request</h1><p className="page-intro">When you submit a request, you can follow each step of the response here.</p></section><div className="empty-card"><span className="empty-icon" aria-hidden="true">◷</span><h3>Nothing to track yet</h3><p>You haven’t sent a request for help yet.</p><button className="primary-button" type="button" onClick={() => onNavigate('request')}>Request help</button></div></div>
  }

  return (
    <div className="page-stack">
      <section className="page-heading"><p className="eyebrow">REQUEST NOTES</p><h1>Track your request</h1><p className="page-intro">Requests are saved only on this device. They are not delivered to a response team, and status updates are not live.</p></section>
      <div className="tracking-layout">
        <div className="tracking-main"><RequestCard request={request} /><section className="form-card timeline-card"><div className="form-section-title"><span className="form-section-icon">◷</span><div><h2>Response progress</h2><p>Updates from your local relief team</p></div></div><RequestTimeline timeline={request.timeline} /></section></div>
        <aside className="tracking-aside"><div className="aside-card"><span className="aside-icon">♥</span><h3>Need to add information?</h3><p>Reach out to your local relief team and share your request ID.</p><strong className="aside-request-id">{request.id}</strong></div><div className="aside-card muted-aside"><span className="aside-icon">⌖</span><h3>Find help nearby</h3><p>See shelters and relief stations close to your area.</p><button className="text-button" type="button" onClick={() => onNavigate('nearby')}>Explore nearby aid →</button></div></aside>
      </div>
    </div>
  )
}

export default RequestTracking
