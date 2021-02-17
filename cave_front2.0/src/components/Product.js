import React from 'react'

const Product = ({ product }) => {
  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.weight}</td>
      <td>{product.price}</td>
    </tr>
  )
}

export default Product