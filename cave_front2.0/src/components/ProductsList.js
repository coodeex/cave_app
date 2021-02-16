import React from 'react'
import Product from '../components/Product'

const ProductList = ({ products }) => {
  return (
    <ul>
        {products.slice().reverse().filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i).reverse().sort(function (a, b) {
          if (a.name < b.name) { return -1; }
          if (a.name > b.name) { return 1; }
          return 0;
        }).map((product, i) =>
          <Product key={i} product={product} />
        )}
      </ul>
  )
}

export default ProductList