import { useState } from 'react'
import React from 'react'
import './Home.css'

function Home() {
  // Enhanced product data with categories
  const products = [
    { id: 1, name: 'Red Apples', price: 2.99, unit: '/ lb', tag: 'Best Seller', category: 'Fruits', emoji: '🍎' },
    { id: 2, name: 'Organic Milk', price: 3.49, unit: '/ l', tag: 'Best Seller', category: 'Dairy', emoji: '🥛' },
    { id: 3, name: 'Potato Chips', price: 1.99, unit: '/ pc', tag: 'Best Seller', category: 'Snacks', emoji: '🥔' },
    { id: 4, name: 'Fresh Chicken', price: 5.99, unit: '/ lb', tag: 'Best Seller', category: 'Proteins', emoji: '🍗' },
    { id: 5, name: 'Bananas', price: 1.29, unit: '/ lb', category: 'Fruits', emoji: '🍌' },
    { id: 6, name: 'Cheddar Cheese', price: 4.59, unit: '/ 200g', category: 'Dairy', emoji: '🧀' },
    { id: 7, name: 'Blueberry Yogurt', price: 2.49, unit: '/ cup', category: 'Dairy', emoji: '🍯' },
    { id: 8, name: 'Frozen Pizza', price: 6.99, unit: '/ pc', category: 'Frozen', emoji: '🍕' },
    { id: 9, name: 'Broccoli', price: 2.49, unit: '/ bunch', category: 'Vegetables', emoji: '🥦' },
    { id: 10, name: 'Orange Juice', price: 3.99, unit: '/ l', category: 'Beverages', emoji: '🧃' },
  ]

  const [cart, setCart] = useState([])
  
  const featuredProducts = products.filter(p => p.tag === 'Best Seller')

  function addToCart(p) {
    setCart((c) => [...c, p])
  }

  return (
    <div className="site-root">
      <header className="site-header">
        <div className="header-inner">
          <div className="brand">
            <div className="logo-mark">🌿</div>
            <div className="brand-name">StarBazar</div>
          </div>
          <div className="search">
            <input placeholder="Search for products..." />
          </div>
          <nav className="header-actions">
            <button className="icon-btn">❤</button>
            <button className="icon-btn">🛒 <span className="cart-count">{cart.length}</span></button>
          </nav>
        </div>
      </header>

      <section className="hero-banner">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Fresh Groceries, Faster Checkout</h1>
          <p>Shop the best quality products at great prices!</p>
          <div className="hero-categories">
            {['Fruits','Dairy','Snacks','Frozen','Beverages'].map((c, idx) => (
              <button key={c} className={`hero-cat-btn ${idx === 0 ? 'active' : ''}`}>{c}</button>
            ))}
          </div>
        </div>
      </section>

      <main className="container">
        <section className="best-sellers">
          <h3>Best Sellers</h3>
          <div className="seller-list">
            {products.filter(p => p.tag === 'Best Seller').map(p => (
              <article key={p.id} className="product-card small">
                <div className="product-img">{p.emoji}</div>
                <div className="product-body">
                  <div className="product-name">{p.name}</div>
                  <div className="product-price">${p.price.toFixed(2)} <span className="unit">{p.unit}</span></div>
                  <button className="add-btn" onClick={() => addToCart(p)}>Add to Cart</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="shop-grid">
          <h3>Shop All Products</h3>
          <div className="grid">
            {products.map(p => (
              <article key={p.id} className="product-card">
                <div className="product-img large">{p.emoji}</div>
                <div className="product-body">
                  <div className="product-name">{p.name}</div>
                  <div className="product-price">${p.price.toFixed(2)} <span className="unit">{p.unit}</span></div>
                  <button className="add-btn" onClick={() => addToCart(p)}>Add to Cart</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-left">
            © {new Date().getFullYear()} StarBazar — Fresh groceries delivered.
          </div>
          <div className="footer-right">
            <div className="company-info">
              <h4>StarBazar Inc.</h4>
              <p>123 Main Street<br />New York, NY 10001<br />USA</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
