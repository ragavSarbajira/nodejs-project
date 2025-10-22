// src/components/LoadingSpinner.jsx
import React from 'react'
import { Loader } from 'lucide-react'

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <Loader className="animate-spin text-blue-600" size={32} />
    </div>
  )
}

export default LoadingSpinner