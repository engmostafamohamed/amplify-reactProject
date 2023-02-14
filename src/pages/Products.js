import React, { useEffect, useState } from 'react';
import useHttp from '../hooks/use-http';
import AddProduct from '../components/AddProduct';
import Modal from '../components/Modal';
import EditProduct from '../components/EditProduct';
import classes from '../css/Products.module.css';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editProduct, setEditProduct] = useState('');
  const { isLoading, isError, sendRequest } = useHttp();

  const getProducts = () => {
    sendRequest(
      'https://x84o4kin6e.execute-api.us-east-1.amazonaws.com/Prod/product',
      'GET',
      null,
      setProducts
    );
  };

  const onAddProduct = (e) => {
    setProducts((prev) => [...prev, e]);
  };

  const onProductUpdate = (e) => {
    setProducts((prev) =>
      prev.map((prod) => (prod.product_id === e.product_id ? e : prod))
    );
  };

  const onEditProduct = (e) => {
    setEditProduct(e);
    setIsEdit(true);
  };

  const onDeleteProduct = (product_id) => {
    sendRequest(
      'https://x84o4kin6e.execute-api.us-east-1.amazonaws.com/Prod/product',
      'DELETE',
      {
        product_id
      },
      (data) =>
        setProducts((prev) =>
          prev.filter((prod) => prod.product_id !== data.product_id)
        )
    );
  };

  useEffect(() => {
    getProducts();
  }, []);

  const product_rows =
    products.length > 0 &&
    products.map((product) => (
      <tr key={product.product_id}>
        <td>{product.product_id}</td>
        <td>{product.product_name}</td>
        <td>{product.product_price}</td>
        <td>{product.product_desc}</td>
        <td>
          <button
            className={classes['actions-btn']}
            onClick={() => {
              onDeleteProduct(product.product_id);
            }}
          >
            Delete
          </button>
          <button
            className={classes['actions-btn']}
            onClick={() => {
              onEditProduct(product);
            }}
          >
            Edit
          </button>
          <button className={classes['actions-btn']}>
            <Link to={`create-order/${product.product_id}/${product.product_name}/${product.product_price}`}>buy</Link>
          </button>
        </td>
      </tr>
    ));

  return (
    <div className={classes['products-page']}>
      {product_rows.length === 0 && (
        <p style={{ textAlign: 'center', padding: '10px 0px' }}>
          No products found!
        </p>
      )}
      {product_rows.length > 0 && (
        <table className={classes['products-table']}>
          <thead>
            <tr>
              <td>Product ID</td>
              <td>Product Name</td>
              <td>Product Price</td>
              <td>Product Description</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>{product_rows}</tbody>
        </table>
      )}
      <AddProduct onAddProduct={onAddProduct} />
      {isEdit && (
        <Modal>
          <EditProduct
            product={editProduct}
            onEditProduct={onProductUpdate}
            setIsEdit={setIsEdit}
          />
        </Modal>
      )}
    </div>
  );
};
export default Products;
