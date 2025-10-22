// src/pages/HomePage.jsx
import React, { useEffect } from 'react'
import { useProductStore } from '../store/productStore'
import ProductCard from '../components/ProductCard'
import LoadingSpinner from '../components/LoadingSpinner'

const HomePage = () => {
  const { products, loading, fetchProducts } = useProductStore()

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
        <p className="text-gray-600 mt-2">Browse our collection of products</p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">No products found</h3>
          <p className="text-gray-500 mt-2">Check back later for new products.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default HomePage