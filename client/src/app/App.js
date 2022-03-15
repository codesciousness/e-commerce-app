import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Checkout from '../components/checkout/Checkout';
import Login from '../components/login/Login';
import OrderDetail from '../components/orderDetail/OrderDetail';
import ProductDetail from '../components/productDetail/ProductDetail';
import Register from '../components/register/Register';
import Cart from '../features/cart/Cart';
import Orders from '../features/orders/Orders';
import Products from '../features/products/Products';
import Users from '../features/users/Users';
import { logout, selectUserId, selectLogoutSuccess, selectLogoutError, clearUsersStatusUpdates } from '../features/users/usersSlice';
import { clearCart } from '../features/cart/cartSlice';
import { clearOrder } from '../features/orders/ordersSlice';
import { clearProduct } from '../features/products/productsSlice';

function App() {
  const userId = useSelector(selectUserId);
  const logoutSuccess = useSelector(selectLogoutSuccess);
  const logoutError = useSelector(selectLogoutError);
  const dispatch = useDispatch();
  let location = useLocation();
  let navigate = useNavigate();
  let home = location.pathname === '/';
  let Button;

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target.id === 'logoutButton') {
      dispatch(logout());
      dispatch(clearCart());
      dispatch(clearOrder());
      dispatch(clearProduct());
    }
  };
    
  if (userId) {
    Button =
      <li className="App__navbar__li">
        <Link to='/'>
          <button id='logoutButton' className="App__logout__button" onClick={handleClick}><i className="fas fa-sign-out-alt fa-lg"></i> Logout</button>
        </Link>
      </li>
      
  }
  else {
    Button = 
      <li className="App__navbar__li">
        <Link to='login'>
          <button id='loginButton' className="App__login__button"><i className="fas fa-sign-in-alt fa-lg"></i> Login</button>
        </Link>
      </li> 
  }

  useEffect(() => {
    if (logoutSuccess || logoutError) {
      dispatch(clearUsersStatusUpdates());
      navigate('/');
    }
  }, [logoutSuccess, logoutError, dispatch, navigate]);

  return (
    <div className="App">
      <header className="App__header">
        <Link to='/'>{home ? <h1 className="App__title">E-commerce Store</h1> : <div className="App__navbar__div"><i className="fas fa-home fa-lg"></i><p>Home</p></div>}</Link>
        <nav className="App__navbar">
          <ul className="App__navbar__list">
            <li className="App__navbar__li"><Link to='cart'><div className="App__navbar__div"><i className="fas fa-shopping-cart fa-lg"></i><p>Cart</p></div></Link></li>
            <li className="App__navbar__li"><Link to='orders'><div className="App__navbar__div"><i className="fas fa-box-open fa-lg"></i><p>Orders</p></div></Link></li>
            <li className="App__navbar__li"><Link to='profile'><div className="App__navbar__div"><i className="fas fa-user fa-lg"></i><p>Profile</p></div></Link></li>
            <li className="App__navbar__li"><Link to='register'><div className="App__navbar__div"><i className="fas fa-sign-in-alt fa-lg"></i><p>Sign Up</p></div></Link></li>
            {Button}
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Products />}/>
          <Route path="products/:productId" element={<ProductDetail />}/>
          <Route path="login" element={<Login />}/>
          <Route path="register" element={<Register />}/>
          <Route path="cart" element={<Cart />}/>
          <Route path="cart/checkout" element={<Checkout />}/>
          <Route path="profile" element={<Users />}/>
          <Route path="orders" element={<Orders />}/>
          <Route path="orders/:orderId" element={<OrderDetail />}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
