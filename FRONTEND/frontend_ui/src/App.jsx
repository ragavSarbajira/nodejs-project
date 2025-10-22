// src/App.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import CreateProductPage from './pages/CreateProductPage'
import EditProductPage from './pages/EditProductPage'
import WishlistPage from './pages/WishlistPage'
import Layout from './components/Layout'

function App() {
  return (
    <Router>
      <div className="App">
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/create-product" element={<CreateProductPage />} />
            <Route path="/edit-product/:id" element={<EditProductPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
          </Routes>
        </Layout>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </div>
    </Router>
  )
}

export default App