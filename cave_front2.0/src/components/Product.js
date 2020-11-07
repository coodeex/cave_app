import React from 'react'

const Product = ({ product }) => {
  return (
  <li>{product.name} {product.weight}g</li>
  )
}

export default Product