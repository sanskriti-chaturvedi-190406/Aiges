import RequestCard from '../components/RequestCard'

function RequestHistory({ requests, onTrack, onNavigate }) {
  return (
    <div className="page-stack">
      <section className="page-heading"><p className="eyebrow">YOUR SUPPORT JOURNEY</p><h1>Request history</h1><p className="page-intro">Review the support requests you’ve made and check their latest updates.</p></section>
      {requests.length ? <div className="history-list">{requests.map((request) => <RequestCard key={request.id} request={request} onTrack={() => onTrack(request.id)} />)}</div> : <div className="empty-card"><span className="empty-icon" aria-hidden="true">◷</span><h3>Your history will appear here</h3><p>Once you make a request, you’ll be able to follow it here.</p><button className="primary-button" type="button" onClick={() => onNavigate('request')}>Request help</button></div>}
    </div>
  )
}

export default RequestHistory
