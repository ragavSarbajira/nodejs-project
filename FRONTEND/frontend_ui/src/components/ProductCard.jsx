import React from 'react'
import { Link } from 'react-router-dom'
import { Edit, Trash2, Heart } from 'lucide-react'
import { useProductStore } from '../store/productStore'
import { useWishlistStore } from '../store/productStore'

const ProductCard = ({ product, showActions = true }) => {
  const { deleteProduct } = useProductStore()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore()
  
  const inWishlist = isInWishlist(product.id)

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(product.id)
    }
  }

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {product.name}
        </h3>
        <p className="text-2xl font-bold text-green-600 mb-4">
          ${product.price}
        </p>
        
        <div className="flex justify-between items-center">
          <Link 
            to={`/product/${product.id}`}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            View Details
          </Link>
          
          {showActions && (
            <div className="flex space-x-2">
              <button
                onClick={handleWishlistToggle}
                className={`p-2 rounded-full transition-colors ${
                  inWishlist 
                    ? 'text-red-500 bg-red-50' 
                    : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                }`}
              >
                <Heart size={18} fill={inWishlist ? 'currentColor' : 'none'} />
              </button>
              
              <Link 
                to={`/edit-product/${product.id}`}
                className="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50"
              >
                <Edit size={16} />
              </Link>
              
              <button
                onClick={handleDelete}
                className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard