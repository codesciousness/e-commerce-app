import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Cart from '../features/cart/Cart';
import Products from '../features/products/Products';
import Checkout from '../components/checkout/Checkout';

function App() {
  return (
    <div className="App">
      <header className="App__header">
        <h1 className="App__title">E-commerce Store</h1>
        <nav className="App__navbar">
          <ul className="App__navbar__list">
            <li className="App__navbar__li"><div className="App__navbar__div"><i className="fas fa-shopping-bag fa-lg"></i><p>Cart</p></div></li>
            <li className="App__navbar__li"><div className="App__navbar__div"><i className="fas fa-shopping-cart fa-lg"></i><p>Checkout</p></div></li>
            <li className="App__navbar__li"><div className="App__navbar__div"><i className="fas fa-sign-in-alt fa-lg"></i><p>Signup</p></div></li>
            <li className="App__navbar__li"><button className="App__logout__button"><i className="fas fa-sign-out-alt fa-lg"></i> Logout</button></li>
          </ul>
        </nav>
      </header>
      <main>
        <Products />
        <Checkout />
      </main>
    </div>
  );
}

export default App;
