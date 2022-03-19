import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Checkout from '../components/checkout/Checkout';
import Home from '../components/home/Home';
import Login from '../components/login/Login';
import Navbar from '../components/navbar/Navbar';
import OrderDetail from '../components/orderDetail/OrderDetail';
import ProductDetail from '../components/productDetail/ProductDetail';
import Register from '../components/register/Register';
import Cart from '../features/cart/Cart';
import Orders from '../features/orders/Orders';
import Users from '../features/users/Users';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="App__main">
        <Routes>
          <Route path="/" element={<Home />}/>
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
