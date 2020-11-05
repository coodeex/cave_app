import React, { useState, useEffect } from 'react';
import firebase from '../util/firebase';
import 'firebase/database';    // for realtime database
import Product from './Product';

export default function ProductList() {
  const [productList, setProductList] = useState();

  useEffect(() => {
    const productRef = firebase.database().ref('Product');
    productRef.on('value', (snapshot) => {
      const products = snapshot.val();
      const productList = [];
      for (let id in products) {
        productList.push({ id, ...products[id] });
      }
      setProductList(productList);
    });
  }, []);

  return (
    <div>
      {productList
        ? productList.map((product, index) => <Product product={product} key={index} />)
        : ''}
    </div>
  );
}