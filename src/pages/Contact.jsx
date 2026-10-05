import Arrow from '../components/Arrow.jsx'

export default function Contact() {
  return (
    <section className="contact-page section">
      <div className="contact-page-heading"><p className="eyebrow">LET'S TALK</p><h1>A little hello.<br /><em>A sweet beginning.</em></h1><p>Questions about a dessert or planning something special?<br />We'd love to hear from you.</p></div>
      <div className="contact-details">
        <div><h2>Email</h2><a href="mailto:hello@ruthiel.example">hello@ruthiel.example <Arrow diagonal /></a><p>Placeholder email for your shop.</p></div>
        <div><h2>Visit</h2><p>Your shop address</p><span>Add your location here.</span></div>
        <div><h2>Hours</h2><p>Your opening hours</p><span>Add your schedule here.</span></div>
      </div>
    </section>
  )
}
