import Home from './pages/Home.jsx'
import { useEffect, useState } from 'react'

export default function App() {
  const [location, setLocation] = useState(() => window.location.pathname + window.location.hash)
  function navigate(url) {
    window.history.pushState({}, '', url)
    setLocation(window.location.pathname + window.location.hash)
  }
  useEffect(() => {
    const update = () => setLocation(window.location.pathname + window.location.hash)
    window.addEventListener('popstate', update)
    return () => window.removeEventListener('popstate', update)
  }, [])
  useEffect(() => {
    const hash = location.split('#')[1]
    if (hash) document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
    else window.scrollTo({ top: 0, behavior: 'instant' })
    document.title = location.startsWith('/desserts') ? 'Desserts | Ruthiel' : location.startsWith('/story') ? 'Story | Ruthiel' : location.startsWith('/contact') ? 'Contact | Ruthiel' : 'Ruthiel'
  }, [location])
  const pathname = location.split('#')[0]
  const page = pathname === '/desserts' ? 'desserts' : pathname === '/story' ? 'story' : pathname === '/contact' ? 'contact' : 'home'
  return <div onClick={event => {
    const link = event.target.closest('a[href]')
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    const href = link.getAttribute('href')
    if (!href.startsWith('/') || href.startsWith('//')) return
    event.preventDefault()
    navigate(href)
  }}><Home page={page} navigate={navigate} /></div>
}
