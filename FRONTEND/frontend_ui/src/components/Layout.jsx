// src/components/Layout.jsx
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Package, Plus, Heart } from 'lucide-react'
import { useWishlistStore } from '../store/productStore'

const Layout = ({ children }) => {
  const location = useLocation()
  const { wishlist } = useWishlistStore()

  return (
    <div className="min-h-screen bg-dark-primary">
      <nav className="bg-dark-secondary border-b border-dark-border shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link 
                to="/" 
                className="flex items-center space-x-2 text-xl font-bold text-dark-text hover:text-white transition-colors"
              >
                <Package className="h-8 w-8 text-dark-accent" />
                <span>Shiplytics</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === '/' 
                    ? 'text-dark-accent bg-blue-900/30 border border-dark-accent/30' 
                    : 'text-dark-muted hover:text-dark-text hover:bg-dark-border/50'
                }`}
              >
                Products
              </Link>
              
              <Link
                to="/wishlist"
                className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === '/wishlist' 
                    ? 'text-red-400 bg-red-900/30 border border-red-400/30' 
                    : 'text-dark-muted hover:text-red-400 hover:bg-dark-border/50'
                }`}
              >
                <Heart size={18} className="inline mr-1" />
                Wishlist
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              
              <Link
                to="/create-product"
                className="flex items-center space-x-1 bg-dark-accent text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors border border-blue-500/30"
              >
                <Plus size={16} />
                <span>Add Product</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}

export default Layout