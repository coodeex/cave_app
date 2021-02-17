import React from 'react'
import Batch from '../components/Batch'

const BatchesList = ({ batches }) => {
  return (
    <div className="container">
      <h2>Batches</h2>
      <div className="TableScroll">
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Ingredients</th>
              <th>Volume (L)</th>
              <th>Bottle price (€)</th>
            </tr>
            {batches.map((batch, i) =>
              <Batch key={i} batch={batch} />
            )}
          </tbody>
        </table>
      </div>
    </div >
  )
}

export default BatchesList