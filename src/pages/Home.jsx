import ImagePlaceholder from '../components/ImagePlaceholder.jsx'
import { useEffect, useState } from 'react'
import Arrow from '../components/Arrow.jsx'
import Desserts from './Desserts.jsx'
import Story from './Story.jsx'
import Contact from './Contact.jsx'

const products = [
  { id: 1, name: 'name', category: 'Cakes', price: 850, note: 'description', size: '6 inch · serves 6–8' },
  { id: 2, name: 'name', category: 'Cakes', price: 920, note: 'description', size: '6 inch · serves 6–8' },
  { id: 3, name: 'name', category: 'Little treats', price: 380, note: 'description', size: 'Box of 6' },
  { id: 4, name: 'name', category: 'Cakes', price: 780, note: 'description', size: '6 inch · serves 6–8' },
]
const money = (value) => new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(value)


export default function Home({ page = 'home', navigate }) {
  const [filter, setFilter] = useState('All desserts')
  const [cart, setCart] = useState([])
  const [panel, setPanel] = useState(null)
  const [selected, setSelected] = useState(null)
  const [notice, setNotice] = useState('')
  const count = cart.reduce((sum, item) => sum + item.quantity, 0)
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  useEffect(() => {
    if (!panel && !selected) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const previouslyFocused = document.activeElement
    const close = (event) => {
      if (event.key === 'Escape') { setPanel(null); setSelected(null) }
      if (event.key === 'Tab') {
        const dialog = document.querySelector('[role="dialog"]')
        const controls = dialog?.querySelectorAll('button, a[href], input, select, textarea')
        if (!controls?.length) return
        const first = controls[0]
        const last = controls[controls.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', close)
    return () => { document.body.style.overflow = previous; window.removeEventListener('keydown', close); previouslyFocused?.focus() }
  }, [panel, selected])
  useEffect(() => { if (notice) { const timer = setTimeout(() => setNotice(''), 2500); return () => clearTimeout(timer) } }, [notice])
  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-revealed')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    document.querySelectorAll('.hero-copy, .hero-image, .section-heading, .catalog-heading, .catalog-item, .product, .story-image, .story-copy, .contact, .footer-top').forEach(element => observer.observe(element))
    return () => observer.disconnect()
  }, [filter, page])
  function add(product) {
    setCart(items => items.some(item => item.id === product.id) ? items.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...items, { ...product, quantity: 1 }])
    setNotice(`${product.name} added to your bag`)
  }
  function quantity(id, change) { setCart(items => items.map(item => item.id === id ? { ...item, quantity: item.quantity + change } : item).filter(item => item.quantity > 0)) }
  return (
    <>
      <div className="announcement">A little sweetness, made with love. <span>Meet your next favorite <Arrow /></span></div>
      <header className="header">
        <a className="wordmark" href="/" aria-label="Ruthiel home">ruthiel<span>®</span></a>
        <nav aria-label="Main navigation"><a href="/desserts" aria-current={page === 'desserts' ? 'page' : undefined}>Desserts</a><a href="/story" aria-current={page === 'story' ? 'page' : undefined}>Story</a><a href="/contact" aria-current={page === 'contact' ? 'page' : undefined}>Contact</a></nav>
        <button className="bag-button" onClick={() => setPanel('bag')}>Bag <span>{count.toString().padStart(2, '0')}</span></button>
      </header>
      <main id="home" className={`page-${page}`}>
        {page === 'home' && <section className="hero">
          <div className="hero-copy"><h1>Life is sweeter<br />with <em>a little</em><br />ruthiel.</h1><p className="hero-description">Thoughtfully made desserts for everyday joys<br className="desktop-break" /> and moments worth celebrating.</p><a className="button dark" href="/desserts">Find your sweet thing <Arrow /></a></div>
          <div className="hero-image"><ImagePlaceholder /></div>
        </section>}
        {page === 'desserts' && <Desserts products={products} filter={filter} setFilter={setFilter} setSelected={setSelected} add={add} money={money} />}
        {page === 'story' && <Story />}
        {page === 'contact' && <Contact />}
        {page === 'home' && <section className="contact section" id="contact"><p className="eyebrow">A REASON TO CELEBRATE?</p><h2>Let’s make it<br /><em>a little sweeter.</em></h2><p>Birthdays, gatherings, or a just-because treat.<br />We’d love to be part of your moment.</p><a className="button dark" href="mailto:hello@ruthiel.example">Say hello <Arrow diagonal /></a><span className="contact-note">Contact email is a placeholder for your shop.</span></section>}
      </main>
      <footer><div className="footer-top"><a className="wordmark" href="/">ruthiel<span>®</span></a><p>A little sweetness.<br />A lot of heart.</p><a href="#home">Back to top &#8593;</a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Ruthiel. Made with love.</span><span>A dessert shop template · Philippines</span></div></footer>
      {notice && <div className="toast" role="status">{notice} <span>&#10003;</span></div>}
      {selected && <div className="overlay" onClick={() => setSelected(null)}><section className="product-dialog" role="dialog" aria-modal="true" aria-label={selected.name} onClick={e => e.stopPropagation()}><button autoFocus className="close" onClick={() => setSelected(null)} aria-label="Close product details">×</button><ImagePlaceholder /><div><p className="eyebrow">{selected.category}</p><h2>{selected.name}</h2><p>{selected.note}</p><p>{selected.size}</p><p className="detail-price">{money(selected.price)}</p><button className="button dark" onClick={() => add(selected)}>Add to bag <span>+</span></button></div></section></div>}
      {panel && <div className="overlay bag-overlay" onClick={() => setPanel(null)}><section className="bag-panel" role="dialog" aria-modal="true" aria-label="Shopping bag" onClick={e => e.stopPropagation()}><div className="bag-heading"><h2>{panel === 'checkout' ? 'Your details' : 'Your sweet things'}</h2><button autoFocus className="close" onClick={() => setPanel(null)} aria-label="Close bag">×</button></div>{panel === 'success' ? <div className="empty-bag"><span>&#10035;</span><h2>A little preview,<br />complete.</h2><p>This is a demo confirmation. No order was sent and no payment was collected.</p><button className="button dark" onClick={() => { setPanel(null); setCart([]) }}>Keep exploring <Arrow /></button></div> : panel === 'checkout' ? <form className="checkout" onSubmit={e => { e.preventDefault(); setPanel('success') }}><p className="template-note">Demo checkout · no real orders or payments.</p><label>Your name<input required autoComplete="name" placeholder="Full name" /></label><label>Email address<input type="email" required autoComplete="email" placeholder="you@example.com" /></label><label>Phone number<input type="tel" required autoComplete="tel" placeholder="Your contact number" /></label><label>Fulfillment<select><option>Pickup</option><option>Delivery</option></select></label><label>Address / order notes<textarea placeholder="Delivery address or anything we should know" rows="3" /></label><div className="subtotal"><span>Subtotal</span><strong>{money(total)}</strong></div><button className="button dark" type="submit">Preview confirmation <Arrow /></button><button className="back-button" type="button" onClick={() => setPanel('bag')}>&#8592; Back to bag</button></form> : count ? <><div className="bag-items">{cart.map(item => <div className="bag-item" key={item.id}><ImagePlaceholder /><div><h3>{item.name}</h3><p>{money(item.price)}</p><div className="quantity"><button aria-label={`Remove one ${item.name}`} onClick={() => quantity(item.id, -1)}>-</button><span>{item.quantity}</span><button aria-label={`Add one ${item.name}`} onClick={() => quantity(item.id, 1)}>+</button></div></div><button className="remove" onClick={() => setCart(items => items.filter(p => p.id !== item.id))} aria-label={`Remove ${item.name}`}>×</button></div>)}</div><div className="bag-summary"><div className="subtotal"><span>Subtotal</span><strong>{money(total)}</strong></div><p>Delivery fees aren't included. Sample products & prices.</p><button className="button dark" onClick={() => setPanel('checkout')}>Continue to demo checkout <Arrow /></button></div></> : <div className="empty-bag"><span>&#10035;</span><h2>A little room<br />for sweetness.</h2><p>Your bag is empty. Find something you love.</p><button className="button dark" onClick={() => { setPanel(null); navigate('/desserts') }}>Explore desserts <Arrow /></button></div>}</section></div>}
    </>
  )
}
