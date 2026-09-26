function RequestCard({ request, onTrack }) {
  return (
    <article className="request-card">
      <div className="request-card-top"><span className="request-category">{request.category}</span><span className={`status-pill status-${request.status.toLowerCase().replaceAll(' ', '-')}`}>{request.status}</span></div>
      <h3>{request.title || `${request.category} assistance`}</h3>
      <p className="request-description">{request.details}</p>
      <div className="request-meta"><span><span aria-hidden="true">⌖</span> {request.location}</span><span>#{request.id}</span></div>
      {onTrack && <button className="text-button" type="button" onClick={() => onTrack(request.id)}>View updates <span aria-hidden="true">→</span></button>}
    </article>
  )
}

export default RequestCard
