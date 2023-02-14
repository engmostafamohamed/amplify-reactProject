import React, { useEffect, useState } from 'react';
import Input from '../UI/Input';
import useHttp from '../hooks/use-http';
import classes from '../css/AddProduct.module.css';

const AddProduct = ({ onAddProduct }) => {
  const { isLoading, isError, sendRequest } = useHttp();
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDesc, setProductDesc] = useState('');

  const onProductNameChange = (e) => {
    setProductName(e.target.value);
  };
  const onProductPriceChange = (e) => {
    setProductPrice(e.target.value);
  };
  const onProductDescChange = (e) => {
    setProductDesc(e.target.value);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const body = {
      product_name: productName,
      product_price: productPrice,
      product_desc: productDesc
    };
    sendRequest(
      'https://x84o4kin6e.execute-api.us-east-1.amazonaws.com/Prod/product',
      'POST',
      body,
      onAddProduct
    );
    setProductName('');
    setProductPrice('');
    setProductDesc('');
  };

  return (
    <div className={classes['add-product']}>
      <h2>Add Product</h2>
      <form onSubmit={onFormSubmit} autoComplete='off'>
        <Input
          type='text'
          id='name'
          title='Product Name'
          value={productName}
          onChange={onProductNameChange}
        />
        <Input
          type='text'
          id='price'
          title='Product Price'
          value={productPrice}
          onChange={onProductPriceChange}
        />
        <Input
          type='text'
          id='desc'
          title='Product Description'
          value={productDesc}
          onChange={onProductDescChange}
        />
        {!isLoading && <button type='submit'>Add Product</button>}
      </form>
    </div>
  );
};

export default AddProduct;
