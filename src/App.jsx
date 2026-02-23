import { useState } from 'react'
import Home from './Home'
import Products from './Products'
import Checkout from './Checkout'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [cart, setCart] = useState([])

  const handleNavigate = (page, category = null) => {
    if (category) {
      setSelectedCategory(category)
    }
    setCurrentPage(page)
  }

  const handleAddToCart = (product, quantity) => {
    for (let i = 0; i < quantity; i++) {
      setCart(prev => [...prev, product])
    }
  }

  const handleRemoveFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index))
  }

  const handleClearCart = () => {
    setCart([])
  }

  return (
    <>
      {currentPage === 'home' && <Home onNavigate={handleNavigate} cart={cart} onAddToCart={handleAddToCart} />}
      {currentPage === 'products' && (
        <Products selectedCategory={selectedCategory} onNavigate={handleNavigate} cart={cart} onAddToCart={handleAddToCart} />
      )}
      {currentPage === 'checkout' && (
        <Checkout onNavigate={handleNavigate} cart={cart} onRemoveFromCart={handleRemoveFromCart} onClearCart={handleClearCart} />
      )}
    </>
  )
}

export default App
