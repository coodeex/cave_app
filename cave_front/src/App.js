import React from 'react';
import './App.css';
import BatchForm from './components/BatchForm';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';



export default function App() {
  return (
    <div className="App">
      <h1>Cave App</h1>
      <ProductForm />
      <ProductList />
      <BatchForm />
    </div>
  );
}
