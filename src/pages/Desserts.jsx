import ImagePlaceholder from '../components/ImagePlaceholder.jsx'
﻿import { useMemo, useState } from 'react'

export default function Desserts({ products, filter, setFilter, setSelected, add, money }) {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('featured')
  const visible = useMemo(() => {
    const items = products.filter(product =>
      (filter === 'All desserts' || product.category === filter) &&
      `${product.name} ${product.note}`.toLowerCase().includes(search.trim().toLowerCase())
    )
    if (sort === 'low') items.sort((a, b) => a.price - b.price)
    if (sort === 'high') items.sort((a, b) => b.price - a.price)
    if (sort === 'name') items.sort((a, b) => a.name.localeCompare(b.name))
    return items
  }, [products, filter, search, sort])

  return (
    <section className="catalog section" id="collection">
      <div className="catalog-heading">
        <div><h1>Desserts.</h1></div>
        <p>Pick your favorites.<br />Make room for something sweet.</p>
      </div>
      <div className="catalog-layout">
        <aside className="catalog-sidebar">
          <label className="catalog-search">Search desserts<input type="search" placeholder="Find a sweet thing..." value={search} onChange={event => setSearch(event.target.value)} /></label>
          <h2>Categories</h2>
          <div className="catalog-categories">{['All desserts', 'Cakes', 'Little treats'].map(category => <button key={category} aria-pressed={filter === category} className={filter === category ? 'active' : ''} onClick={() => setFilter(category)}><span>{category}</span><span>{products.filter(product => category === 'All desserts' || product.category === category).length}</span></button>)}</div>
          <p className="catalog-sidebar-note">Something for sharing.<br />Something just for you.</p>
        </aside>
        <div className="catalog-results">
          <div className="catalog-toolbar"><span aria-live="polite">{visible.length} {visible.length === 1 ? 'dessert' : 'desserts'}</span><label>Sort by <select value={sort} onChange={event => setSort(event.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="name">Name</option></select></label></div>
          <div className="catalog-list">
            {visible.map(product => <article className="catalog-item" key={product.id}>
              <button className="catalog-photo" onClick={() => setSelected(product)} aria-label={`View ${product.name}`}><ImagePlaceholder /></button>
              <div className="catalog-info"><span className="catalog-category">{product.category}</span><h2><button onClick={() => setSelected(product)}>{product.name}</button></h2><p>{product.note}</p><span className="catalog-size">{product.size}</span><button className="catalog-details" onClick={() => setSelected(product)}>View details &#8599;</button></div>
              <div className="catalog-purchase"><span>{money(product.price)}</span><button className="button dark" onClick={() => add(product)} aria-label={`Add ${product.name} to bag`}>Add to bag <span>+</span></button></div>
            </article>)}
          </div>
          {!visible.length && <div className="catalog-empty"><h2>No desserts found.</h2><p>Try another search or category.</p><button onClick={() => { setSearch(''); setFilter('All desserts') }}>Show all desserts &#8594;</button></div>}
          <p className="template-note">Sample menu and prices. Orders are currently a demo.</p>
        </div>
      </div>
    </section>
  )
}
