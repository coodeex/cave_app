import React from 'react'
import productService from '../services/products'


const ProductForm = ({ products, setProducts, newProductName, setNewProductName, newProductPrice, setNewProductPrice, newProductWeight, setNewProductWeight }) => {

  const validateAddProduct = (event) => {
    event.preventDefault()
    if (newProductWeight < 10) {
      if (window.confirm("Onko paino oikeesti alle 10 grammaa?")) {
        addProduct(event)
      }
    } else {
      addProduct(event)
    }
  }

  const addProduct = (event) => {
    event.preventDefault()
    const productObject = {
      name: newProductName,
      price: newProductPrice,
      weight: newProductWeight,
    }

    productService
      .create(productObject)
      .then(returnedProductAndStatus => {
        if (returnedProductAndStatus.updatedExisting === false) {//created a new product
          setProducts(products.concat(returnedProductAndStatus.product))
        } else {//updated a existing product
          setProducts(products.map(product => product.id !== returnedProductAndStatus.product.id
            ? product
            : returnedProductAndStatus.product
          ))
        }
        setNewProductName('')
        setNewProductPrice('')
        setNewProductWeight('')
      }).catch(err => {
        alert(err.response.data.error)
        console.log(err.response)
      })
  }

  const handleProductNameChange = (event) => {
    setNewProductName(event.target.value)
  }

  const handleProductPriceChange = (event) => {
    setNewProductPrice(event.target.value)
  }

  const handleProductWeightChange = (event) => {
    setNewProductWeight(event.target.value)
  }

  return (
    <form onSubmit={validateAddProduct}>
      <label>Nimi
        <input
          value={newProductName}
          placeholder="Amarillo"
          onChange={handleProductNameChange}
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
      <label>Hinta (€)
        <input
          pattern="[0-9]*\.?[0-9]?[0-9]?"
          placeholder="8.99"
          value={newProductPrice}
          onChange={handleProductPriceChange}
        />
      </label>
      <label>Paino (g)
        <input
          pattern="[0-9]*"
          placeholder="100"
          value={newProductWeight}
          onChange={handleProductWeightChange}
        />
      </label>

      <button type="submit">save</button>
    </form>
  )

}
export default ProductForm