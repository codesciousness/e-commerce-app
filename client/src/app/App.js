import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Register from '../components/register/Register';
import Products from '../features/products/Products';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App__header">
        <h1 className="App__title">E-commerce Store</h1>
        <nav className="App__navbar">
          <ul className="App__navbar__list">
            <li className="App__navbar__li">My Cart</li>
            <li className="App__navbar__li">Checkout</li>
            <li className="App__navbar__li">My Profile</li>
            <li className="App__navbar__li">Register/Signup</li>
          </ul>
        </nav>
      </header>
      <body>
        <main>
          <Products />
        </main>
      </body>
    </div>
  );
}

export default App;
