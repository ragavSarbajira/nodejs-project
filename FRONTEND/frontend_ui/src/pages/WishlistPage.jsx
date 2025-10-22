import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, ArrowLeft, Trash2 } from 'lucide-react'
import { useWishlistStore } from '../store/productStore'
import ProductCard from '../components/ProductCard'

const WishlistPage = () => {
  const { wishlist, clearWishlist, removeFromWishlist } = useWishlistStore()

  if (wishlist.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-6"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to products
        </Link>

        <div className="text-center py-12">
          <Heart className="mx-auto h-16 w-16 text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-6">Start adding products you love to your wishlist!</p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to products
        </Link>
        
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} in wishlist
          </span>
          <button
            onClick={clearWishlist}
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Trash2 size={16} className="mr-2" />
            Clear All
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
        <p className="text-gray-600 mt-2">Products you've saved for later</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <div key={product.id} className="relative">
            <ProductCard product={product} showActions={false} />
            <button
              onClick={() => removeFromWishlist(product.id)}
              className="absolute top-2 right-2 p-2 text-red-500 bg-white rounded-full shadow-md hover:bg-red-50"
            >
              <Heart size={18} fill="currentColor" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WishlistPage