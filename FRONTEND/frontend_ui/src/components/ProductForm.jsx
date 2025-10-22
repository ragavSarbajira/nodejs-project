import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useProductStore } from '../store/productStore'
import LoadingSpinner from './LoadingSpinner'

const ProductForm = ({ isEdit = false }) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { createProduct, updateProduct, fetchProduct, currentProduct, loading } = useProductStore()
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: ''
  })
  
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (isEdit && id) {
      fetchProduct(id)
    }
  }, [isEdit, id, fetchProduct])

  useEffect(() => {
    if (isEdit && currentProduct) {
      setFormData({
        name: currentProduct.name || '',
        price: currentProduct.price || '',
        image: currentProduct.image || ''
      })
    }
  }, [isEdit, currentProduct])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      if (isEdit) {
        await updateProduct(id, formData)
      } else {
        await createProduct(formData)
      }
      navigate('/')
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading && isEdit) {
    return <LoadingSpinner />
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          {isEdit ? 'Edit Product' : 'Create New Product'}
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Product Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
              Price *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter price"
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
              Image URL *
            </label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter image URL"
            />
          </div>

          {formData.image && (
            <div>
              <p className="block text-sm font-medium text-gray-700 mb-2">Image Preview</p>
              <img 
                src={formData.image} 
                alt="Preview" 
                className="h-48 w-48 object-cover rounded-md border"
              />
            </div>
          )}

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Saving...' : (isEdit ? 'Update Product' : 'Create Product')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductForm