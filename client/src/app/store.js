import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';
import searchTermReducer from '../features/searchTerm/searchTermSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    searchTerm: searchTermReducer
  },
});
