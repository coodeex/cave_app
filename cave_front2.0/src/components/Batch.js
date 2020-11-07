import React from 'react'

//hinta, käytetyt ainekset, (muistiinpanoja, arvosteluita, kuvia)

const Batch = ({ batch }) => {
  return (
  <li>{batch.name} {batch.volume} litres</li>
  )
}

export default Batch