import React from 'react';
import classes from '../css/Input.module.css';

const Input = ({ type, id, title, value, onChange }) => {
  return (
    <div className={classes['input-card']}>
      <label htmlFor={id}>{title}</label>
      <input type={type} name={id} value={value} onChange={onChange} />
    </div>
  );
};
export default Input;
