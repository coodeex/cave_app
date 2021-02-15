import React from 'react'
import Batch from '../components/Batch'

const BatchesList = ({ batches }) => {
  return (
    <ul>
        {batches.map((batch, i) =>
          <Batch key={i} batch={batch} />
        )}
      </ul>
  )
}

export default BatchesList