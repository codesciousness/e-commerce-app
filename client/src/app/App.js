import React from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Users from '../features/users/Users';
import Register from '../components/register/Register';
import { logout } from '../features/auth/authSlice';

function App() {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target.id === 'logoutButton') {
        dispatch(logout());
    }
  };

  return (
    <div className="App">
      <header className="App__header">
        <h1 className="App__title">E-commerce Store</h1>
        <nav className="App__navbar">
          <ul className="App__navbar__list">
            <li className="App__navbar__li"><div className="App__navbar__div"><i className="fas fa-shopping-bag fa-lg"></i><p>Cart</p></div></li>
            <li className="App__navbar__li"><div className="App__navbar__div"><i className="fas fa-shopping-cart fa-lg"></i><p>Checkout</p></div></li>
            <li className="App__navbar__li"><div className="App__navbar__div"><i className="fas fa-sign-in-alt fa-lg"></i><p>Signup</p></div></li>
            <li className="App__navbar__li"><button id='logoutButton' className="App__logout__button" onClick={handleClick}>
              <i className="fas fa-sign-out-alt fa-lg"></i> Logout</button></li>
          </ul>
        </nav>
      </header>
      <main>
        <Register />
        <Users />
      </main>
    </div>
  );
}

export default App;
