import React from 'react'
import batchService from '../services/batches'
import NewBatchProducts from './NewBatchProducts'

const BatchForm = ({ products, batches, setBatches, newBatchName, setNewBatchName, newBatchProducts, setNewBatchProducts, newBatchSize, setNewBatchSize, newBatchDescription, setNewBatchDescription, newBatchExtraCosts, setNewBatchExtraCosts }) => {

  const validateAddBatch = (event) => {
    event.preventDefault()
    if (!newBatchName || newBatchName === '') {
      window.alert("Batch name missing")
      return
    }
    if (newBatchProducts.filter(p => p.productName === '' || p.usedWeight === 0).length !== 0) {
      window.alert("Used product or weight info missing")
      return
    }
    if (("newBatchProducts", new Set(newBatchProducts.map(p => p.productName)).size !== newBatchProducts.length)) {
      window.alert("Do not add same product multiple times")
      return
    }
    if (!newBatchSize || newBatchSize === '') {
      window.alert("Volume missing")
      return
    }
    if (!newBatchDescription || newBatchDescription === '') {
      window.alert("Description missing")
      return
    }


    if (newBatchSize < 5) {
      if (window.confirm("Is the batch size really under 5 litres?")) {
        addBatch(event)
      }
    } else {
      addBatch(event)
    }
  }

  const addBatch = (event) => {
    event.preventDefault()
    const batchObject = {
      batchName: newBatchName,
      products: newBatchProducts,
      batchSize: newBatchSize,
      description: newBatchDescription,
      extraCosts: newBatchExtraCosts || 0,
    }
    batchService
      .create(batchObject)
      .then(returnedBatchAndStatus => {
        setBatches(batches.concat(returnedBatchAndStatus.batch))
        setNewBatchName('')
        setNewBatchSize('')
        setNewBatchDescription('')
        setNewBatchExtraCosts('')
        setNewBatchProducts([{ productName: "", usedWeight: "" }])
        if(returnedBatchAndStatus)alert("Batch added succesully")
      }).catch(err => {
        alert(err.response.data.error)
        console.log(err.response)
        return
      })
  }

  const handleBatchNameChange = (event) => {
    setNewBatchName(event.target.value)
  }

  const handleBatchSizeChange = (event) => {
    setNewBatchSize(event.target.value)
  }

  const handleBatchDescriptionChange = (event) => {
    setNewBatchDescription(event.target.value)
  }

  const handleBatchExtraCostsChange = (event) => {
    setNewBatchExtraCosts(event.target.value)
  }

  return (
    <form onSubmit={validateAddBatch}>
      <h2>batch</h2>
      <label>Batch name
        <input
          type="text"
          value={newBatchName}
          placeholder="Summer IPA"
          onChange={handleBatchNameChange}
        />
      </label>
      <NewBatchProducts products={products} newBatchProducts={newBatchProducts} setNewBatchProducts={setNewBatchProducts} />
      <label>Volume (L)
        <input
          pattern="[0-9]*\.?[0-9]?[0-9]?"
          placeholder="20"
          value={newBatchSize}
          onChange={handleBatchSizeChange}
        />
      </label>
      <label>Description
        <input
          type="text"
          placeholder="jees"
          value={newBatchDescription}
          onChange={handleBatchDescriptionChange}
        />
      </label>
      <label>Extra costs €
        <input
          pattern="[0-9]*\.?[0-9]?[0-9]?"
          placeholder="10.52"
          value={newBatchExtraCosts}
          onChange={handleBatchExtraCostsChange}
        />
      </label>

      <button type="submit">Add Batch</button>
    </form>
  )

}
export default BatchForm