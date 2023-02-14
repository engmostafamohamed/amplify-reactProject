import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import Products from '../pages/Products';
import classes from '../css/Main.module.css';
import createOrder from './createOrder';

const Main = () => {
  return (
    <main className={classes['main']}>
      <Switch>
        <Route path='/home'>
          <Home />
        </Route>
        <Route path='/products'>
          <Products />
        </Route>
        <Route path='/create-order/:id/:product_name/:product_price' component={createOrder}/>
      </Switch>
    </main>
  );
};

export default Main;
