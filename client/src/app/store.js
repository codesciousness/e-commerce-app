import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';
import searchTermReducer from '../features/searchTerm/searchTermSlice';
import cartReducer from '../features/cart/cartSlice';
import usersReducer from '../features/users/usersSlice';
import ordersReducer from '../features/orders/ordersSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    searchTerm: searchTermReducer,
    cart: cartReducer,
    users: usersReducer,
    orders: ordersReducer
  },
});
