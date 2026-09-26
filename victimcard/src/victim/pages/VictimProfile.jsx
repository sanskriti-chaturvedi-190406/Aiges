import { useState } from 'react'

function VictimProfile({ profile, onSave }) {
  const [form, setForm] = useState(profile)

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  function submit(event) {
    event.preventDefault()
    onSave(form)
  }

  return (
    <div className="page-stack narrow-page">
      <section className="page-heading"><p className="eyebrow">YOUR INFORMATION</p><h1>Your profile</h1><p className="page-intro">Keep your contact and household details up to date so response teams can support you.</p></section>
      <form className="form-card" onSubmit={submit}>
        <div className="form-section-title"><span className="form-section-icon">♙</span><div><h2>Personal details</h2><p>Saved only in this browser; this prototype does not send details to a response team.</p></div></div>
        <div className="form-grid">
          <div className="field-group"><label htmlFor="profile-name">Full name</label><input id="profile-name" name="name" autoComplete="name" value={form.name} onChange={updateField} placeholder="Your name" /></div>
          <div className="field-group"><label htmlFor="profile-phone">Phone number</label><input id="profile-phone" name="phone" autoComplete="tel" type="tel" value={form.phone} onChange={updateField} placeholder="A number we can reach you at" /></div>
          <div className="field-group"><label htmlFor="profile-email">Email address</label><input id="profile-email" name="email" autoComplete="email" type="email" value={form.email} onChange={updateField} placeholder="you@example.com" /></div>
          <div className="field-group"><label htmlFor="profile-household">People in your household</label><input id="profile-household" name="householdSize" type="number" min="1" max="50" value={form.householdSize} onChange={updateField} /></div>
          <div className="field-group full-field"><label htmlFor="profile-address">Home address or area</label><textarea id="profile-address" name="address" autoComplete="street-address" rows="2" value={form.address} onChange={updateField} placeholder="Address or nearby landmark" /></div>
          <div className="field-group full-field"><label htmlFor="profile-accessibility">Accessibility or other support needs <span className="optional-label">Optional</span></label><textarea id="profile-accessibility" name="accessibilityNeeds" rows="3" value={form.accessibilityNeeds} onChange={updateField} placeholder="Share anything that will help us support you safely" /></div>
        </div>
        <div className="form-actions"><p>Your information stays in this browser.</p><button className="primary-button" type="submit">Save changes</button></div>
      </form>
    </div>
  )
}

export default VictimProfile
