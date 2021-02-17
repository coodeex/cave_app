import React from 'react'
import Product from '../components/Product'

const ProductList = ({ products }) => {
  return (
    <div className="container">
      <h2>Products</h2>
      <div>These products are in the virtual storage.</div>
      <br></br>
      <div className="TableScroll">
        <table>
          <tbody>
            <tr>
              <th>Product</th>
              <th>Weight (g)</th>
              <th>Price (€)</th>
            </tr>
            {products.slice().reverse().filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i).reverse().sort(function (a, b) {
              if (a.name < b.name) { return -1; }
              if (a.name > b.name) { return 1; }
              return 0;
            }).map((product, i) =>
              <Product key={i} product={product} />
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductList