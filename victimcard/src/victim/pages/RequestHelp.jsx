import { useState } from 'react'
import LocationConfirmation from '../components/LocationConfirmation'

const categories = ['Food & water', 'Emergency shelter', 'Medical support', 'Rescue & evacuation', 'Clothing & supplies', 'Other']
const urgencyLevels = ['Whenever possible', 'Within a few hours', 'Immediate danger']

function RequestHelp({ profile, onSubmit }) {
  const [form, setForm] = useState({ category: categories[0], urgency: urgencyLevels[0], location: profile.address || '', details: '', contact: profile.phone || '' })

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  function submit(event) {
    event.preventDefault()
    onSubmit(form)
  }

  return (
    <div className="page-stack narrow-page">
      <section className="page-heading"><p className="eyebrow">YOUR SUPPORT NOTES</p><h1>Request help</h1><p className="page-intro">Record what’s happening and keep the details together. This prototype saves requests only in this browser.</p></section>
      <div className="urgent-banner"><span className="urgent-icon">!</span><p><strong>In immediate danger?</strong> Contact your local emergency services now. This form is for connecting you with relief support.</p></div>
      <form className="form-card request-form" onSubmit={submit}>
        <div className="form-section-title"><span className="form-section-icon">＋</span><div><h2>What support do you need?</h2><p>Fields marked required help us respond quickly.</p></div></div>
        <div className="field-group"><div className="field-label-row"><label htmlFor="help-category">Type of assistance</label><span>Required</span></div><select id="help-category" name="category" value={form.category} onChange={updateField} required>{categories.map((category) => <option key={category}>{category}</option>)}</select></div>
        <div className="field-group"><div className="field-label-row"><label htmlFor="help-urgency">How soon do you need help?</label><span>Required</span></div><select id="help-urgency" name="urgency" value={form.urgency} onChange={updateField} required>{urgencyLevels.map((level) => <option key={level}>{level}</option>)}</select></div>
        <LocationConfirmation value={form.location} onChange={(location) => setForm((current) => ({ ...current, location }))} />
        <div className="field-group"><div className="field-label-row"><label htmlFor="help-details">Tell us a little more</label><span>Required</span></div><textarea id="help-details" name="details" rows="4" maxLength="1000" value={form.details} onChange={updateField} placeholder="What do you need, and who needs help? Include any details that may help us respond." required /><span className="field-hint">{form.details.length}/1000 characters</span></div>
        <div className="field-group"><label htmlFor="help-contact">Best phone number to reach you <span className="optional-label">Optional</span></label><input id="help-contact" name="contact" type="tel" autoComplete="tel" value={form.contact} onChange={updateField} placeholder="Phone number" /></div>
        <div className="form-actions"><p>This request will not be sent to a relief team.</p><button className="primary-button" type="submit">Save request <span aria-hidden="true">→</span></button></div>
      </form>
    </div>
  )
}

export default RequestHelp
