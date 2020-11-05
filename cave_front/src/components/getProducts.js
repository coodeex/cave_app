import React, { useState, useEffect } from 'react';
import firebase from '../util/firebase';
import 'firebase/database';    // for realtime database

export default function ListOfProducts() {
  const [listOfProducts, setListOfProducts] = useState();
  console.log("gettistä", listOfProducts)
  useEffect(() => {
    const productRef = firebase.database().ref('Product');
    productRef.on('value', (snapshot) => {
      const products = snapshot.val();
      const productList = [];
      for (let id in products) {
        productList.push({ id, ...products[id] });
      }
      setListOfProducts(productList);
      console.log("gettistä", listOfProducts)
    });
  }, []);

  console.log("gettistä", listOfProducts)
  const thisProducts=listOfProducts
  return (
    thisProducts
  )
}