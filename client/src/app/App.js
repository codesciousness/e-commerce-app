import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Login from '../components/login/Login';
//import Register from '../components/register/Register';
//import Profile from '../components/profile/Profile';
import Orders from '../features/orders/Orders';
import OrderDetail from '../components/orderDetail/OrderDetail';
import { logout, selectLogoutSuccess, selectLogoutError, clearUsersStatusUpdates } from '../features/users/usersSlice';

function App() {
  const dispatch = useDispatch();
  const logoutSuccess = useSelector(selectLogoutSuccess);
  const logoutError = useSelector(selectLogoutError);

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target.id === 'logoutButton') {
      dispatch(logout());
    }
  };

  useEffect(() => {
    if (logoutSuccess || logoutError) {
      dispatch(clearUsersStatusUpdates());
    }
  }, [logoutSuccess, logoutError, dispatch]);

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
        <Login />
        <Orders />
        <OrderDetail />
      </main>
    </div>
  );
}

export default App;
