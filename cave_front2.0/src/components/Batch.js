import React from 'react'

const Batch = ({ batch }) => {
  return (
    <tr>
      <td>{batch.batchName} </td>
      <td>{batch.description}</td>
      <td>{batch.products.map(p => p.productName).toString()}</td>
      <td>{batch.batchSize} </td>
      <td>{Math.round((batch.oneBottlePrice + Number.EPSILON) * 100) / 100}</td>
    </tr>
  )
}

export default Batch