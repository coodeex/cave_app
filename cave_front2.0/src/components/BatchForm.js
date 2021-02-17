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
        if (returnedBatchAndStatus) alert("Batch added succesully")
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
    <div className="container">
      <form onSubmit={validateAddBatch}>
        <h1>Batch Form</h1>
        <div>A brewed batch can be submitted with this form. It calculates the price of one bottle based on the information provided. Please add all the products used in the batch including malts, hops, yeast, etc. and provide possible extra costs not related to the products in the virtual storage. </div>
        <div className="row">
          <label className="col-25">Batch name</label>
          <input className="col-25"
            type="text"
            value={newBatchName}
            placeholder="Summer IPA"
            onChange={handleBatchNameChange}
          />
        </div>
        <NewBatchProducts products={products} newBatchProducts={newBatchProducts} setNewBatchProducts={setNewBatchProducts} />
        <div className="row">
          <label className="col-25">Volume (L)</label>
          <input className="col-25"
            pattern="[0-9]*\.?[0-9]?[0-9]?"
            placeholder="20"
            value={newBatchSize}
            onChange={handleBatchSizeChange}
          />
          <label className="col-25">Extra costs (€)</label>
          <input className="col-25"
            pattern="[0-9]*\.?[0-9]?[0-9]?"
            placeholder="10.52"
            value={newBatchExtraCosts}
            onChange={handleBatchExtraCostsChange}
          />
        </div>
        <div className="row">
          <label className="col-25">Description</label>
          <textarea className="col-75"
            type="text"
            placeholder="Fresh IPA for hot summer days"
            value={newBatchDescription}
            onChange={handleBatchDescriptionChange}
          />
        </div>
        <div className="row"><label className="col-25"></label>
          <button type="submit" className="col-75">Add Batch</button>
        </div>
      </form>
    </div>
  )

}
export default BatchForm