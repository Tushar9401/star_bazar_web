import { useState } from 'react'
import Home from './Home'
import Products from './Products'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedCategory, setSelectedCategory] = useState(null)

  const handleNavigate = (page, category = null) => {
    if (category) {
      setSelectedCategory(category)
    }
    setCurrentPage(page)
  }

  return (
    <>
      {currentPage === 'home' && <Home onNavigate={handleNavigate} />}
      {currentPage === 'products' && (
        <Products selectedCategory={selectedCategory} onNavigate={handleNavigate} />
      )}
    </>
  )
}

export default App
