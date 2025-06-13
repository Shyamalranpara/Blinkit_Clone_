import React from 'react'

const AddToCartButton = ({ data }) => {
  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log('Adding to cart:', data)
  }

  return (
    <button 
      onClick={handleAddToCart}
      className='bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm'
    >
      Add
    </button>
  )
}

export default AddToCartButton 