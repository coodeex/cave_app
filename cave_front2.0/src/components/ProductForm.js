import React from 'react'
import productService from '../services/products'
import '../App.css';


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
    <div className="container">
      <h1>Product Form</h1>
      <div>Purchased products can be added to the virtual storage with this form</div>
      <form onSubmit={validateAddProduct} >
        <div className="row">
          <label className="col-25">Name</label>
          <input className="col-75"
            value={newProductName}
            placeholder="Amarillo"
            onChange={handleProductNameChange}
            list="opts"
          />
        </div>
        <datalist id="opts">
          {products.reverse().sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
          }).map(p => <option key={p.id}>{p.name}</option>)}
        </datalist>
        <div className="row">
          <label className="col-25">Price (€)</label>
          <input className="col-75"
            pattern="[0-9]*\.?[0-9]?[0-9]?"
            placeholder="8.99"
            value={newProductPrice}
            onChange={handleProductPriceChange}
          />
        </div>
        <div className="row">
          <label className="col-25">Weight (g)</label>
          <input className="col-75"
            pattern="[0-9]*"
            placeholder="100"
            value={newProductWeight}
            onChange={handleProductWeightChange}
          />
        </div>
        <div className="row"><label className="col-25"></label>
          <button type="submit" className="col-75">save</button>
        </div>


        {/* <div className="row"></div> */}
      </form>
    </div>
  )

}
export default ProductForm