import React from 'react'
import batchService from '../services/batches'

//setNewBatchProducts onki vähä haastavampi
const BatchForm = ({ products, batches, setBatches, newBatchName, setNewBatchName, newBatchProducts, setNewBatchProducts, newBatchSize, setNewBatchSize, newBatchDescription, setNewBatchDescription }) => {

  const validateAddBatch = (event) => {
    event.preventDefault()
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
    }

    console.log("batchObject\n",batchObject)

    batchService
      .create(batchObject)
      .then(returnedBatchAndStatus => {
        if (returnedBatchAndStatus.updatedExisting === false) {//created a new batch
          setBatches(batches.concat(returnedBatchAndStatus.batch))
        } else {//updated a existing batch
          setBatches(batches.map(batch => batch.id !== returnedBatchAndStatus.batch.id
            ? batch
            : returnedBatchAndStatus.batch
          ))
        }
        setNewBatchName('')
        setNewBatchSize('')
        setNewBatchDescription('')
      }).catch(err => {
        alert(err.response.data.error)
        console.log(err.response)
      })
  }

  const handleBatchNameChange = (event) => {
    setNewBatchName(event.target.value)
  }

  const handleBatchProductsChange = (event) => {
    //setNewBatchProducts([("Amarillo",100),("Magnum",80)])
  }

  const handleBatchSizeChange = (event) => {
    setNewBatchSize(event.target.value)
  }

  const handleBatchDescriptionChange = (event) => {
    setNewBatchDescription(event.target.value)
  }

  return (
    <form onSubmit={validateAddBatch}>
      <label>Batch name
        <input
          value={newBatchName}
          placeholder="Summer IPA"
          onChange={handleBatchNameChange}
        />
      </label>
      
      <label>Product used jaaaaa kuinka paljon
      {/* vois laittaa newBatchProducts arrayhyn aina uuden productin ja painon  */}
        <input
          value={newBatchName}
          placeholder="Amarillo"
          onChange={handleBatchProductsChange}
          list="opts"
        />
      </label>
      <datalist id="opts">
        {products.reverse().sort(function (a, b) {
          if (a.name < b.name) { return -1; }
          if (a.name > b.name) { return 1; }
          return 0;
        }).map(p => <option key={p.id}>{p.name}</option>)}
      </datalist>

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
          placeholder="jees"
          value={newBatchDescription}
          onChange={handleBatchDescriptionChange}
        />
      </label>

      <button type="submit">Add Batch</button>
    </form>
  )

}
export default BatchForm