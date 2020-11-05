import React, { useState } from 'react';
import firebase from '../util/firebase';

export default function ProductForm() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0); // in grams
  const [price, setPrice] = useState(0); // in euros e.g. 3.28 [€]

  const handleOnNameChange = (e) => {
    setName(e.target.value);
  };
  
  const handleOnAmountChange = (e) => {
    setAmount(e.target.value);
  };
  
  const handleOnPriceChange = (e) => {
    setPrice(e.target.value);
  };


  const createProduct = () => {
    const productRef = firebase.database().ref('Product');
    const product = {
      name,
      amount,
      price,
    };

    productRef.push(product);
    setName('')
    setAmount('')
    setPrice('')
  };
  return (
    <div>
      <input type="text" onChange={handleOnNameChange} value={name} />
      <input type="text" onChange={handleOnPriceChange} value={price} />
      <input type="text" onChange={handleOnAmountChange} value={amount} />
      <button onClick={createProduct}>Lisää tuote</button>
    </div>
  );
}