function ShelterCard({ shelter }) {
  return (
    <article className="aid-card">
      <div className="aid-card-heading"><span className="aid-icon shelter-icon" aria-hidden="true">⌂</span><span className="distance-tag">{shelter.distance}</span></div>
      <h3>{shelter.name}</h3>
      <p className="aid-address">{shelter.address}</p>
      <div className="aid-details"><span>{shelter.capacity} spaces available</span><span>{shelter.status}</span></div>
      <a className="aid-contact" href={`tel:${shelter.phone.replace(/[^\d+]/g, '')}`}>Call {shelter.phone}</a>
    </article>
  )
}

export default ShelterCard
