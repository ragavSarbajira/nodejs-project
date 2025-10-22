// src/pages/ProductPage.jsx
import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useProductStore } from '../store/productStore'
import LoadingSpinner from '../components/LoadingSpinner'

const ProductPage = () => {
  const { id } = useParams()
  const { currentProduct, loading, fetchProduct } = useProductStore()

  useEffect(() => {
    if (id) {
      fetchProduct(id)
    }
  }, [id, fetchProduct])

  if (loading) {
    return <LoadingSpinner />
  }

  if (!currentProduct) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900">Product not found</h2>
        <Link to="/" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
          Back to products
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to products
      </Link>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0 md:w-1/2">
            <img
              className="h-96 w-full object-cover md:h-full"
              src={currentProduct.image}
              alt={currentProduct.name}
            />
          </div>
          <div className="p-8 md:w-1/2">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {currentProduct.name}
              </h1>
              <p className="text-3xl font-bold text-green-600">
                ${currentProduct.price}
              </p>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Product ID</dt>
                  <dd className="text-sm text-gray-900">{currentProduct.id}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Created</dt>
                  <dd className="text-sm text-gray-900">
                    {new Date(currentProduct.created_at).toLocaleDateString()}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage