import { useState } from 'react'
import React from 'react'
import './Home.css'

function Home({ onNavigate }) {
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
    { id: 11, name: 'Maggi Whole Wheat Pack of 3', price: 1.49, unit: '/ pack', tag: 'Best Seller', category: 'Snacks', image: '/71R+kuYnovL._AC_UF894,1000_QL80_.jpg' },
  ]

  // Offers data
  const offers = [
    { id: 101, name: 'Red Apples', originalPrice: 5.99, offerPrice: 2.99, offerText: 'Buy 2 at 2.99', category: 'Fruits', emoji: '🍎' },
    { id: 102, name: 'Organic Milk', originalPrice: 6.99, offerPrice: 3.49, offerText: 'Buy 2 at 2.99', category: 'Dairy', emoji: '🥛' },
    { id: 103, name: 'Bananas', originalPrice: 3.99, offerPrice: 1.29, offerText: 'Buy 2 at 2.99', category: 'Fruits', emoji: '🍌' },
    { id: 104, name: 'Cheddar Cheese', originalPrice: 8.99, offerPrice: 4.59, offerText: 'Buy 2 at 2.99', category: 'Dairy', emoji: '🧀' },
  ]

  const [cart, setCart] = useState([])
  const [quantities, setQuantities] = useState({})
  const [addingToCart, setAddingToCart] = useState({})
  
  const featuredProducts = products.filter(p => p.tag === 'Best Seller')

  function handleAddToCartClick(p) {
    setAddingToCart(prev => ({
      ...prev,
      [p.id]: true
    }))
    if (!quantities[p.id]) {
      setQuantities(prev => ({
        ...prev,
        [p.id]: 1
      }))
    }
  }

  function handleIncreaseQty(p) {
    setQuantities(prev => ({
      ...prev,
      [p.id]: (prev[p.id] || 1) + 1
    }))
  }

  function handleDecreaseQty(p) {
    setQuantities(prev => ({
      ...prev,
      [p.id]: Math.max(1, (prev[p.id] || 1) - 1)
    }))
  }

  function handleConfirmAddToCart(p) {
    const qty = quantities[p.id] || 1
    for (let i = 0; i < qty; i++) {
      setCart((c) => [...c, p])
    }
    setAddingToCart(prev => ({
      ...prev,
      [p.id]: false
    }))
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
            {['Home','Shop All','Contact Us'].map((c, idx) => (
              <button 
                key={c} 
                className={`hero-cat-btn ${idx === 0 ? 'active' : ''}`}
                onClick={() => {
                  if (c === 'Shop All') {
                    onNavigate && onNavigate('products')
                  } else if (c === 'Contact Us') {
                    // Handle Contact Us
                    alert('Contact Us page coming soon!')
                  }
                }}
              >
                {c}
              </button>
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
                <div className="product-img">
                  {p.image ? <img src={p.image} alt={p.name} /> : p.emoji}
                </div>
                <div className="product-body">
                  <div className="product-name">{p.name}</div>
                  <div className="product-price">${p.price.toFixed(2)} <span className="unit">{p.unit}</span></div>
                  {!addingToCart[p.id] ? (
                    <button className="add-btn" onClick={() => handleAddToCartClick(p)}>Add to Cart</button>
                  ) : (
                    <div className="qty-selector">
                      <button className="qty-btn minus" onClick={() => handleDecreaseQty(p)}>−</button>
                      <div className="qty-display">
                        <span className="qty-value">{quantities[p.id] || 1}</span>
                      </div>
                      <button className="qty-btn plus" onClick={() => handleIncreaseQty(p)}>+</button>
                      <button className="confirm-add-btn" onClick={() => handleConfirmAddToCart(p)}>Add to Cart</button>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="offers-section">
          <h3>🎉 Special Offers</h3>
          <div className="offers-grid">
            {offers.map(offer => (
              <article key={offer.id} className="offer-card">
                <div className="offer-badge">Special Deal</div>
                <div className="offer-img">{offer.emoji}</div>
                <div className="offer-body">
                  <div className="offer-name">{offer.name}</div>
                  <div className="price-section">
                    <div className="original-price">${offer.originalPrice.toFixed(2)}</div>
                  </div>
                  <div className="offer-text">{offer.offerText}</div>
                  {!addingToCart[offer.id] ? (
                    <button className="add-btn offer-btn" onClick={() => handleAddToCartClick(offer)}>Add to Cart</button>
                  ) : (
                    <div className="qty-selector compact">
                      <button className="qty-btn minus" onClick={() => handleDecreaseQty(offer)}>−</button>
                      <div className="qty-display">
                        <span className="qty-value">{quantities[offer.id] || 1}</span>
                      </div>
                      <button className="qty-btn plus" onClick={() => handleIncreaseQty(offer)}>+</button>
                      <button className="confirm-add-btn" onClick={() => handleConfirmAddToCart(offer)}>Add to Cart</button>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="shop-grid">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.2rem' }}>
            <h3>Shop All Products</h3>
            <button 
              onClick={() => onNavigate && onNavigate('products')}
              style={{
                background: 'var(--accent)',
                color: '#fff',
                border: 'none',
                padding: '0.7rem 1.5rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '700',
                fontSize: '0.95rem',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.background = 'var(--accent-light)'}
              onMouseOut={(e) => e.target.style.background = 'var(--accent)'}
            >
              View All →
            </button>
          </div>
          <div className="grid">
            {products.map(p => (
              <article key={p.id} className="product-card">
                <div className="product-img large">
                  {p.image ? <img src={p.image} alt={p.name} /> : p.emoji}
                </div>
                <div className="product-body">
                  <div className="product-name">{p.name}</div>
                  <div className="product-price">${p.price.toFixed(2)} <span className="unit">{p.unit}</span></div>
                  {!addingToCart[p.id] ? (
                    <button className="add-btn" onClick={() => handleAddToCartClick(p)}>Add to Cart</button>
                  ) : (
                    <div className="qty-selector">
                      <button className="qty-btn minus" onClick={() => handleDecreaseQty(p)}>−</button>
                      <div className="qty-display">
                        <span className="qty-value">{quantities[p.id] || 1}</span>
                      </div>
                      <button className="qty-btn plus" onClick={() => handleIncreaseQty(p)}>+</button>
                      <button className="confirm-add-btn" onClick={() => handleConfirmAddToCart(p)}>Add to Cart</button>
                    </div>
                  )}
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
