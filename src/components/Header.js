import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from '../css/Header.module.css';

const Header = () => {
  return (
    <header className={classes['header']}>
      <nav className={classes['nav']}>
        <ul>
          <li>
            <NavLink to='/home'>Home</NavLink>
          </li>
          <li>
            <NavLink to='/products'>Products</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
