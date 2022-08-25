import React, { useState, useEffect } from 'react';
import commerce from './lib/commerce';

import ProductsList from './components/ProductsList';
import NavBar from './components/NavBar';

function App () {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  /**
   * Fetch products data from Chec and stores in the products data object.
   * https://commercejs.com/docs/sdk/products
   */
  const fetchProducts = () => {
    commerce.products.list().then((products) => {
      setProducts(products.data);
    }).catch((error) => {
      console.log('There was an error fetching the products', error)
    });
  }

  return (
    <div className="app">
      <NavBar />
      <ProductsList 
        products={products}
      />
    </div>
  )
};

export default App;