import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Cart from '../features/cart/Cart';
import OrderDetail from '../components/orderDetail/OrderDetail';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App__header">
        <h1 className="App__title">E-commerce Store</h1>
        <nav className="App__navbar">
          <ul className="App__navbar__list">
            <li className="App__navbar__li">Cart</li>
            <li className="App__navbar__li">Checkout</li>
            <li className="App__navbar__li">Profile</li>
            <li className="App__navbar__li">Register/Signup</li>
          </ul>
        </nav>
      </header>
      <body>
        <main>
          <OrderDetail />
        </main>
      </body>
    </div>
  );
}

export default App;
