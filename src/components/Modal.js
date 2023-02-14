import React from 'react';
import ReactDOM from 'react-dom';
import classes from '../css/Modal.module.css';

const Backdrop = ({ onClick }) => {
  return <div className={classes['backdrop']} onClick={onClick}></div>;
};

const Overlay = ({ children }) => {
  return <div className={classes['overlay']}>{children}</div>;
};

const Modal = ({ onClick, children }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClick={onClick} />,
        document.getElementById('backdrop')
      )}
      {ReactDOM.createPortal(
        <Overlay children={children} />,
        document.getElementById('overlay')
      )}
    </>
  );
};
export default Modal;
