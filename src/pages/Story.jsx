import ImagePlaceholder from '../components/ImagePlaceholder.jsx'
import Arrow from '../components/Arrow.jsx'

export default function Story() {
  return (
    <section className="story-page section" id="story">
      <div className="story-layout">
        <div className="story-copy">
          <p className="eyebrow">FROM OUR KITCHEN, WITH LOVE</p>
          <h1>Good things take<br /><em>a little care.</em></h1>
          <p>We believe the best moments don't have to be grand. Sometimes, they're a slice of cake, a familiar face, and a reason to slow down.</p>
          <p>That's the feeling behind Ruthiel. Simple pleasures, thoughtful ingredients, and something sweet at the center of it all.</p>
          <a className="text-link" href="/contact">Let's make something sweet <Arrow diagonal /></a>
          <span className="story-signature">with love, ruthiel</span>
        </div>
        <div className="story-image"><ImagePlaceholder /></div>
      </div>
    </section>
  )
}
