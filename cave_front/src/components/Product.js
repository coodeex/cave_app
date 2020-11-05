import React from 'react';
import firebase from '../util/firebase';
import 'firebase/database';    // for realtime database
import '../App.css';



export default function Product({ product }) {


  // const remainingProduct = () => {
  //   const productRef = firebase.database().ref('Product').child(product.id);
  // };
  
  const deleteProduct = () => {
    const productRef = firebase.database().ref('Product').child(product.id);
    productRef.remove();
  };

  return (
    <div>
      <h4 className="juttu">{product.name}, jäljellä: {product.amount}g</h4>
      <button onClick={deleteProduct}>Delete</button>
    </div>
  );
}

