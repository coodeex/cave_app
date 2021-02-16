import React from 'react'

//nimi, kuvaus, käytetyt ainekset, pullon hinta (muistiinpanoja, arvosteluita, kuvia)

const Batch = ({ batch }) => {
  return (
    <li>
      {batch.batchName} {batch.description}
      {batch.batchSize} litres. One bottle price is {Math.round((batch.oneBottlePrice + Number.EPSILON) * 100) / 100}€
    </li>
  )
}

export default Batch