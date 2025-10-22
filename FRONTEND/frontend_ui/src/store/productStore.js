import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'
import toast from 'react-hot-toast'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

export const useProductStore = create((set, get) => ({
  products: [],
  currentProduct: null,
  loading: false,
  error: null,
  
  // Product CRUD operations
  fetchProducts: async () => {
    set({ loading: true, error: null })
    try {
      const response = await api.get('/products')
      set({ products: response.data.data, loading: false, error: null })
    } catch (error) {
      console.error('Error fetching products:', error)
      const errorMessage = error.response?.data?.message || 'Failed to fetch products'
      toast.error(errorMessage)
      set({ loading: false, error: errorMessage })
    }
  },
  
  fetchProduct: async (id) => {
    set({ loading: true, error: null })
    try {
      const response = await api.get(`/products/${id}`)
      set({ currentProduct: response.data.data, loading: false, error: null })
    } catch (error) {
      console.error('Error fetching product:', error)
      const errorMessage = error.response?.data?.message || 'Failed to fetch product'
      toast.error(errorMessage)
      set({ loading: false, error: errorMessage })
    }
  },
  
  createProduct: async (productData) => {
    try {
      const response = await api.post('/products', productData)
      set(state => ({ 
        products: [response.data.data, ...state.products] 
      }))
      toast.success('Product created successfully')
      return response.data
    } catch (error) {
      console.error('Error creating product:', error)
      const errorMessage = error.response?.data?.message || 'Failed to create product'
      toast.error(errorMessage)
      throw error
    }
  },
  
  updateProduct: async (id, productData) => {
    try {
      const response = await api.put(`/products/${id}`, productData)
      set(state => ({
        products: state.products.map(product => 
          product.id === id ? response.data.data : product
        ),
        currentProduct: response.data.data
      }))
      toast.success('Product updated successfully')
      return response.data
    } catch (error) {
      console.error('Error updating product:', error)
      const errorMessage = error.response?.data?.message || 'Failed to update product'
      toast.error(errorMessage)
      throw error
    }
  },
  
  deleteProduct: async (id) => {
    try {
      await api.delete(`/products/${id}`)
      set(state => ({
        products: state.products.filter(product => product.id !== id)
      }))
      toast.success('Product deleted successfully')
    } catch (error) {
      console.error('Error deleting product:', error)
      const errorMessage = error.response?.data?.message || 'Failed to delete product'
      toast.error(errorMessage)
      throw error
    }
  }
}))

// Wishlist store with persistence
export const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlist: [],
      
      addToWishlist: (product) => {
        set(state => {
          const exists = state.wishlist.find(item => item.id === product.id)
          if (exists) {
            toast.error('Product already in wishlist')
            return state
          }
          toast.success('Product added to wishlist')
          return { wishlist: [...state.wishlist, product] }
        })
      },
      
      removeFromWishlist: (productId) => {
        set(state => ({
          wishlist: state.wishlist.filter(item => item.id !== productId)
        }))
        toast.success('Product removed from wishlist')
      },
      
      clearWishlist: () => {
        set({ wishlist: [] })
        toast.success('Wishlist cleared')
      },
      
      isInWishlist: (productId) => {
        return get().wishlist.some(item => item.id === productId)
      }
    }),
    {
      name: 'wishlist-storage',
    }
  )
)