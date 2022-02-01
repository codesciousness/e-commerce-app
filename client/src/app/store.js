import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';
import searchTermReducer from '../features/searchTerm/searchTermSlice';
import cartReducer from '../features/cart/cartSlice';
import authReducer from '../features/auth/authSlice';
import usersReducer from '../features/users/usersSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    searchTerm: searchTermReducer,
    cart: cartReducer,
    auth: authReducer,
    users: usersReducer
  },
});
