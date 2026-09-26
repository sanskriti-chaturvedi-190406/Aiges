function NearbyAid() {
  return (
    <div className="page-stack">
      <section className="page-heading"><p className="eyebrow">SUPPORT CLOSE TO YOU</p><h1>Nearby aid</h1><p className="page-intro">Find shelters and community relief stations near you.</p></section>
      <div className="nearby-notice"><span aria-hidden="true">⌖</span><p><strong>No verified locations are connected yet.</strong> We won’t show unverified addresses or phone numbers. For urgent help, contact your local emergency services.</p></div>
      <div className="empty-card"><span className="empty-icon" aria-hidden="true">⌖</span><h3>Local aid directory unavailable</h3><p>Verified shelter and relief station listings will appear here when the aid directory is connected.</p></div>
    </div>
  )
}

export default NearbyAid
