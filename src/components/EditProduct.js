import React, { useState } from 'react';
import Input from '../UI/Input';
import useHttp from '../hooks/use-http';
import classes from '../css/AddProduct.module.css';

const EditProduct = ({ product, onEditProduct, setIsEdit }) => {
  const { isLoading, isError, sendRequest } = useHttp();
  const [productName, setProductName] = useState(product.product_name);
  const [productPrice, setProductPrice] = useState(product.product_price);
  const [productDesc, setProductDesc] = useState(product.product_desc);

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
      product_id: product.product_id,
      product_name: productName,
      product_price: productPrice,
      product_desc: productDesc
    };
    sendRequest(
      'https://x84o4kin6e.execute-api.us-east-1.amazonaws.com/Prod/product',
      'PATCH',
      body,
      onEditProduct
    );
    setProductName('');
    setProductPrice('');
    setProductDesc('');
    setIsEdit(false);
  };
  return (
    <div className={classes['add-product']}>
      <div className={classes['cancel-btn']}>
        <h2>Edit Product</h2>
        <i className='fa-solid fa-xmark' onClick={() => setIsEdit(false)}></i>
      </div>
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
        {!isLoading && <button type='submit'>Save Changes</button>}
      </form>
    </div>
  );
};

export default EditProduct;
