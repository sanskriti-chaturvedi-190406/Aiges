function RequestTimeline({ timeline = [] }) {
  return (
    <ol className="timeline">
      {timeline.map((item, index) => (
        <li className={`timeline-item${item.complete ? ' complete' : ''}`} key={`${item.label}-${index}`}>
          <span className="timeline-marker" aria-hidden="true">{item.complete ? '✓' : index + 1}</span>
          <div className="timeline-copy">
            <div className="timeline-heading"><strong>{item.label}</strong>{item.timestamp && <time dateTime={item.timestamp}>{new Date(item.timestamp).toLocaleString()}</time>}</div>
            <p>{item.description}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

export default RequestTimeline
