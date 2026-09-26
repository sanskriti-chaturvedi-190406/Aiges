function ReliefStationCard({ station }) {
  return (
    <article className="aid-card">
      <div className="aid-card-heading"><span className="aid-icon station-icon" aria-hidden="true">✚</span><span className="distance-tag">{station.distance}</span></div>
      <h3>{station.name}</h3>
      <p className="aid-address">{station.address}</p>
      <div className="station-services">{station.services.map((service) => <span key={service}>{service}</span>)}</div>
      <a className="aid-contact" href={`tel:${station.phone.replace(/[^\d+]/g, '')}`}>Call {station.phone}</a>
    </article>
  )
}

export default ReliefStationCard
